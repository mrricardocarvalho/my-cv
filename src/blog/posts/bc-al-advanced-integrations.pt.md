# Integrações AL: Para Lá do Básico - Construir Conexões Externas Robustas

Conectar o Business Central ao mundo exterior é um requisito fundamental para sistemas ERP modernos. Seja sincronizando com um CRM, enviando dados para um data warehouse, integrando com plataformas de e-commerce, ou usando serviços externos para cálculos, as integrações estão por toda parte.

O AL fornece os tipos de dados `HttpClient`, `HttpRequestMessage`, `HttpResponseMessage` e `Json*` para facilitar estas conexões. Pedidos básicos GET e POST enviando JSON simples são relativamente diretos. Mas integrações do mundo real são complicadas. Serviços externos ficam offline, APIs mudam, autenticação é complexa, volumes de dados são grandes e erros acontecem.

Construir integrações verdadeiramente *robustas* e *fiáveis* em AL exige ir além da sintaxe básica e adotar padrões que considerem estes desafios do mundo real. Vamos mergulhar em alguns aspetos avançados das integrações AL.

## Lidar com Falhas de Serviços Externos e Retries

APIs externas não são 100% fiáveis. Falhas de rede, tempo de inatividade do serviço, ou erros transientes são comuns. A vossa integração deve antecipar falhas. Simplesmente chamar um `HttpClient.Send()` e lançar um `ERROR` se a resposta não for 200 é insuficiente.

Uma integração robusta precisa de:
1.  **Tratamento de Erros Graciosos:** Capturar os detalhes do erro (código de status, corpo da resposta) sem derrubar todo o processo do Business Central.
2.  **Lógica de Retry:** Para erros transientes (como 429 Too Many Requests ou erros 5xx de servidor), implementar um mecanismo de retry, frequentemente com um atraso exponencial (exponential backoff).
3.  **Logging:** Registar falhas com detalhes suficientes para diagnosticar o problema mais tarde.
4.  **Monitorização e Alertas:** Idealmente, ter uma forma de monitorizar integrações falhadas e ser alertado.

// Codeunit Conceitual de Conector de Serviço Externo com Lógica de Retry
codeunit 50300 "External Service Connector"
{
    var
        Client: HttpClient;
        Request: HttpRequestMessage;
        Response: HttpResponseMessage;
        Content: HttpContent;
        RequestUrl: Text;
        Attempts: Integer;
        MaxAttempts: Integer;
        BaseDelay: Integer; // milissegundos
        Success: Boolean;
    begin
        MaxAttempts := 5; // Exemplo: Tentar até 5 vezes
        BaseDelay := 200; // Exemplo: Começar com atraso de 200ms

        RequestUrl := 'https://external.service.com/api/data'; // Exemplo de URL

        // Preparar a mensagem de pedido (por exemplo, definir Method, Headers, Content)
        Request.Method := 'POST';
        Request.SetRequestUri(RequestUrl);
        Request.Content := CreateRequestContent(); // Função auxiliar para criar HttpContent

        Success := false;
        Attempts := 0;
        REPEAT
            Attempts += 1;
            ClearLastError(); // Limpar quaisquer erros anteriores antes de retentar

            if Client.Send(Request, Response) then begin
                if Response.IsSuccessStatusCode() then begin
                    // Sucesso!
                    Success := true;
                    // Processar Response.Content
                    ProcessResponseContent(Response.Content); // Função auxiliar
                end else begin
                    // Recebido código de status não-sucesso
                    LogIntegrationFailure(RequestUrl, Response.StatusCode, Response.ReasonPhrase, Response.Content); // Registar detalhes
                    if CanRetryStatusCode(Response.StatusCode) and (Attempts < MaxAttempts) then begin
                        // Atrasar antes de retentar
                        Sleep(BaseDelay * Power(2, Attempts - 1)); // Atraso exponencial
                    end else begin
                        // Erro não retentável ou tentativas máximas alcançadas
                        ERROR('Integração falhou após %1 tentativas. Status: %2 %3', Attempts, Response.StatusCode, Response.ReasonPhrase);
                    end;
                end;
            end else begin
                // Erro de rede ou outro problema do lado do cliente
                LogIntegrationFailure(RequestUrl, 0, '', GetLastErrorText()); // Registar detalhes do erro
                if Attempts < MaxAttempts then begin
                     // Atrasar antes de retentar
                     Sleep(BaseDelay * Power(2, Attempts - 1)); // Atraso exponencial
                end else begin
                    ERROR('Integração falhou após %1 tentativas devido a erro de rede: %2', Attempts, GetLastErrorText());
                end;
            end;

        UNTIL Success OR (Attempts >= MaxAttempts AND NOT CanRetryStatusCode(Response.StatusCode)); // Sair se bem sucedido ou tentativas máximas alcançadas para um erro retentável, OU erro não retentável ocorreu

        if NOT Success then
             ERROR('Integração falhou em última instância após %1 tentativas.', MaxAttempts); // Erro final se o loop saiu sem sucesso

    end;

    local procedure CreateRequestContent(): HttpContent;
    begin
        // Criar e devolver HttpContent (por exemplo, JsonContent, TextContent)
        // Exemplo: JsonContent.WriteFrom(MyRecord);
        // exit(JsonContent);
    end;

    local procedure ProcessResponseContent(Content: HttpContent);
    begin
        // Ler e processar Response.Content
        // Exemplo: Content.ReadAs(MyJsonToken);
        // Usar JsonToken.ReadValue() ou JsonObject.Get() etc.
    end;

    local procedure LogIntegrationFailure(Url: Text; StatusCode: Integer; Reason: Text; Content: HttpContent);
    begin
        // Implementar lógica de logging aqui
        // Registar Url, StatusCode, Reason, e talvez conteúdo para diagnóstico
        // Usar codeunits Error, tabelas de log personalizadas, ou telemetria (SessionSettings.LogMessage)
    end;

    local procedure CanRetryStatusCode(StatusCode: Integer): Boolean;
    begin
        // Definir quais códigos de status são considerados transientes e seguros para retentar
        case StatusCode of
            429, // Demasiados Pedidos
            500, // Erro Interno do Servidor
            502, // Bad Gateway
            503, // Serviço Indisponível
            504: // Gateway Timeout
                exit(true);
            else
                exit(false);
        end;
    end;
}

Como discutido no nosso post sobre [Pensamento de Interface em AL](/blog/bc-al-interfaces), usar um **mecanismo de fila** é frequentemente o melhor padrão aqui. O evento ou trigger enfileira o pedido, e um processo separado (como uma Job Queue) tenta a chamada externa, tratando retries e registando falhas sem impactar o utilizador ou a transação original.

## Gerir Grandes Payloads de Dados

Enviar ou receber grandes quantidades de dados via APIs pode sobrecarregar os recursos do sistema e atingir limitações. Podem encontrar problemas de memória, timeouts, ou problemas de desempenho.

Técnicas para grandes payloads:
* **Paginação:** Se a API externa suportar, recuperar dados em pedaços menores usando parâmetros de paginação.
* **Streaming:** Para enviar corpos de pedido grandes, considerar se a API ou `HttpClient` suporta streaming dos dados em vez de carregar o payload inteiro para a memória de uma vez.
* **Compressão:** Usar compressão (como GZIP) se suportado por ambas as partes para reduzir a quantidade de dados transferidos pela rede.
* **Processamento em Segundo Plano:** Tal como com outras operações de grandes volumes de dados ([---INTERNAL_LINK_TO_DATA_POST---](#)), descarregar o processamento de grandes respostas ou o envio de grandes pedidos para uma sessão em segundo plano ou Job Queue.
* **Processar Dados Iterativamente:** Ao receber grandes respostas, processar os dados dentro do corpo da resposta iterativamente, em vez de carregar o JSON ou XML inteiro para variáveis AL, se possível. Usem `JsonToken` ou leitores de stream XML.

## Navegar Complexidades de Autenticação (OAuth 2.0)

Chave de API simples ou autenticação Básica são raras para APIs seguras e modernas. OAuth 2.0 é o padrão de facto, envolvendo múltiplos passos para obter um token de acesso. Implementar o fluxo OAuth a partir de AL requer um tratamento cuidadoso dos pedidos HTTP para um provedor de identidade (como Azure AD) para obter o token, armazenar e refrescar o token, e incluí-lo corretamente em chamadas de API subsequentes.

Isto frequentemente envolve:
* Enviar um pedido POST para um endpoint de token com credenciais de cliente (Client ID, Client Secret) e scope.
* Lidar com a resposta JSON contendo o `access_token` e `refresh_token`.
* Armazenar o token de forma segura (por exemplo, numa tabela de setup, possivelmente encriptada).
* Incluir o `access_token` no cabeçalho `Authorization: Bearer <token>` das chamadas de API.
* Implementar lógica para verificar a expiração do token e usar o `refresh_token` para obter um novo access token sem ter de reautenticar o utilizador.

// Codeunit Conceitual de Gestão de Token OAuth 2.0
codeunit 50310 "OAuth Token Manager"
{
    // Armazenar isto de forma segura (Tabela de Setup, possivelmente encriptada)
    var
        ClientId: Text;
        ClientSecret: Text;
        TokenEndpointUrl: Text;
        Scope: Text;

        // Armazenar o token obtido e o refresh token
        AccessToken: Text;
        RefreshToken: Text;
        TokenExpiryDateTime: DateTime; // Rastrear expiração

        Client: HttpClient; // Reutilizar HttpClient

    procedure GetAccessToken(): Text
    begin
        // Verificar se o token expirou ou precisa de refresh
        if AccessToken = '' or (TokenExpiryDateTime < CurrentDateTime + 10S) then begin // Refrescar se expirou ou está a expirar em breve (buffer de 10 segundos)
            if RefreshToken <> '' then begin
                // Tentar refrescar usando o refresh token
                if TryRefreshToken() then
                    exit(AccessToken) // Refresh bem sucedido
                else begin
                    // Refresh falhou, é preciso obter um novo token usando credenciais
                    if TryGetNewTokenWithCredentials() then
                         exit(AccessToken) // Novo token bem sucedido
                    else
                         error('Falha ao obter ou refrescar token OAuth.'); // Ambos os métodos falharam
                end;
            end else begin
                 // Não há refresh token, é preciso obter um novo token usando credenciais
                 if TryGetNewTokenWithCredentials() then
                    exit(AccessToken) // Novo token bem sucedido
                 else
                    error('Falha ao obter token OAuth com credenciais.'); // Falha ao obter novo token
            end;
        end else begin
            // Token ainda é válido
            exit(AccessToken);
        end;
    end;

    local procedure TryGetNewTokenWithCredentials(): Boolean
    var
        Request: HttpRequestMessage;
        Response: HttpResponseMessage;
        Content: HttpContent;
        JsonObj: JsonObject;
        IsSuccessful: Boolean;
    begin
        // Preparar pedido para o endpoint de token usando credenciais de cliente (Grant Type: client_credentials ou password flow, etc.)
        Request.Method := 'POST';
        Request.SetRequestUri(TokenEndpointUrl);
        Request.GetHeaders().Add('Content-Type', 'application/x-www-form-urlencoded'); // Ou application/json dependendo do endpoint

        // Exemplo de corpo para fluxo client_credentials
        Content.WriteString(StrSubstNo('grant_type=client_credentials&client_id=%1&client_secret=%2&scope=%3',
                                     ClientId, ClientSecret, Scope));
        Request.Content := Content;

        IsSuccessful := false;
        if Client.Send(Request, Response) then begin
            if Response.IsSuccessStatusCode() then begin
                if Response.Content.ReadAs(JsonObj) then begin
                    // Analisar a resposta
                    if JsonObj.Get('access_token', AccessToken) and JsonObj.Get('refresh_token', RefreshToken) then begin
                        // Assumir que 'expires_in' está em segundos
                        if JsonObj.Get('expires_in', JsonToken.Integer) then
                             TokenExpiryDateTime := CurrentDateTime + JsonToken.Integer * 1000; // Calcular expiração
                        else
                             TokenExpiryDateTime := CurrentDateTime + 3600 * 1000; // Padrão se não houver expiração (por exemplo, 1 hora)

                        IsSuccessful := true;
                    end;
                end;
            end;
        end;

        if NOT IsSuccessful then
            LogOAuthError('GetNewToken', Response.StatusCode, Response.ReasonPhrase, GetLastErrorText());

        exit(IsSuccessful);
    end;

    local procedure TryRefreshToken(): Boolean
    var
        Request: HttpRequestMessage;
        Response: HttpResponseMessage;
        Content: HttpContent;
        JsonObj: JsonObject;
        IsSuccessful: Boolean;
    begin
        // Preparar pedido para o endpoint de token usando refresh token (Grant Type: refresh_token)
        Request.Method := 'POST';
        Request.SetRequestUri(TokenEndpointUrl);
        Request.GetHeaders().Add('Content-Type', 'application/x-www-form-urlencoded');

        Content.WriteString(StrSubstNo('grant_type=refresh_token&refresh_token=%1&client_id=%2&client_secret=%3',
                                     RefreshToken, ClientId, ClientSecret)); // Client secret frequentemente necessário para refresh
        Request.Content := Content;

        IsSuccessful := false;
        if Client.Send(Request, Response) then begin
            if Response.IsSuccessStatusCode() then begin
                if Response.Content.ReadAs(JsonObj) then begin
                     // Analisar a resposta - deve obter novos access_token e refresh_token
                     if JsonObj.Get('access_token', AccessToken) and JsonObj.Get('refresh_token', RefreshToken) then begin
                         if JsonObj.Get('expires_in', JsonToken.Integer) then
                             TokenExpiryDateTime := CurrentDateTime + JsonToken.Integer * 1000
                         else
                             TokenExpiryDateTime := CurrentDateTime + 3600 * 1000; // Padrão

                         IsSuccessful := true;
                     end;
                end;
            end;
        end;

         if NOT IsSuccessful then
            LogOAuthError('RefreshToken', Response.StatusCode, Response.ReasonPhrase, GetLastErrorText());

        exit(IsSuccessful);
    end;

    local procedure LogOAuthError(Step: Text; StatusCode: Integer; Reason: Text; ErrorText: Text);
    begin
         // Implementar lógica de logging para falhas OAuth
         // Usar SessionSettings.LogMessage ou tabela de log personalizada
    end;

    // Esta codeunit seria usada pelas vossas codeunits de integração:
    // var
    //    OAuthManager: Codeunit "OAuth Token Manager";
    //    AccessToken: Text;
    //    Request: HttpRequestMessage;
    // begin
    //    AccessToken := OAuthManager.GetAccessToken(); // Obter um token válido
    //    Request.GetHeaders().Add('Authorization', StrSubstNo('Bearer %1', AccessToken)); // Adicionar token ao cabeçalho do pedido
    //    // ... depois enviar o pedido ...
    // end;
}

**O Segredo:** Não codifiquem credenciais diretamente no vosso código. Usem tabelas de setup. Abstraiam o fluxo OAuth para uma codeunit ou serviço dedicado que lida com a obtenção, armazenamento, refresh e fornecimento de tokens de acesso sob demanda. Isto mantém a vossa lógica central de integração limpa e segura.

## Versionamento de API e Gestão de Mudanças

APIs externas evoluem. Novas versões são lançadas, endpoints mudam, ou estruturas de dados são modificadas. Como é que a vossa integração AL se adapta?

* **Especificar a Versão da API:** Sempre especifiquem a versão da API que estão a atingir nos vossos pedidos (frequentemente no URL ou cabeçalhos). Isto previne quebras inesperadas quando o serviço externo lança uma nova versão para a qual não estão preparados.
* **Tratamento Defensivo de Dados:** Ao processar respostas JSON ou XML, lidem graciosamente com potenciais campos em falta ou tipos de dados inesperados. Verifiquem se os elementos existem antes de tentar aceder aos seus valores. Usem `JsonToken.ReadValue()` com verificação de tipo ou `JsonValue.IsType()` para validar dados.
* **Codeunits Wrapper:** Tal como discutido com interações da base app ([---INTERNAL_LINK_TO_INTERFACES_POST---](#)), envolvam as chamadas de API externas nas vossas próprias codeunits ou interfaces de serviço. Se a API externa mudar, atualizam apenas a vossa codeunit wrapper, não todos os locais que chamaram a API.

**O Segredo:** Tratem APIs externas como contratos externos. Ancorar a versões específicas, validar dados recebidos e usar codeunits wrapper para isolar a vossa lógica central de mudanças externas.

## Conclusão: Dominar a Arte da Conexão

Construir integrações externas robustas em Business Central AL é uma habilidade crítica que se estende muito para lá de pedidos HTTP básicos. Exige planear para falhas com lógica de retry, gerir volumes de dados, lidar de forma segura com autenticação complexa como OAuth, e desenhar para mudança através de versionamento de API e codeunits wrapper.

Ao implementar estes padrões avançados, podem construir integrações que não são apenas funcionais, mas também resilientes, fáceis de manter e fiáveis sob condições do mundo real. Não deixem que as complexidades do mundo exterior quebrem a vossa solução Business Central.

Qual é o vosso desafio de integração mais difícil em AL, e que padrões encontraram mais eficazes? Partilhem os vossos insights abaixo!

---