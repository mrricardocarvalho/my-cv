import{g as Rt,j as q,E as ka,u as Ta,a as Sa,b as Aa,r as Oe,L as Ia,l as wa,A as qe,O as Ea}from"./index-DgZ8okVZ.js";import{N as Mt,u as Ra,a as Ma,G as La}from"./ErrorStates-CBolg3GT.js";const Pa=`# AL Debugging: Escaping the F9 Comfort Zone – Advanced Techniques for Elusive Bugs

Every AL developer knows the F9 key. It's our trusty companion, setting breakpoints to pause execution and peer into the state of our code. For simple bugs, a few well-placed F9s and F10s are often enough.

But what about those *other* bugs? The ones that only happen occasionally, in a specific environment, under strange conditions, or deep within a complex process where stepping through line by line would take hours? Relying solely on basic breakpoints in these scenarios is like trying to hunt a phantom with a flashlight.

To effectively combat elusive bugs in Business Central, you need to escape the comfort zone of simple F9. You need a more sophisticated toolkit. This is about turning debugging from a reactive chore into a proactive investigation, armed with techniques that give you surgical precision and deeper insights.

Let's explore some advanced AL debugging techniques that can save you hours of frustration and make you the go-to bug hunter on your team.

## Conditional Breakpoints: Your Surgical Strike

Setting a breakpoint is easy. But what if you only want to pause execution *when* a specific condition is met? For instance, only when a certain variable reaches a particular value, when a record has a specific ID, or when a loop reaches a particular iteration?

This is where **conditional breakpoints** come in. Instead of breaking every time the line is hit, you add an expression that must evaluate to \`true\` for the breakpoint to trigger. This is incredibly powerful when debugging loops, specific record processing within a larger set, or errors that only manifest with particular data.

In VS Code, you can right-click on a breakpoint (the red dot) and select "Edit Breakpoint...". Here you can enter an AL expression.

// Example of a Conditional Breakpoint Expression
// Break only when the Customer No. is 'C00050'
// Expression: Rec."No." = 'C00050'

// Break only when processing the 100th customer in a loop
// Expression: Rec.SystemId = LoopCustomer.SystemId AND LoopCounter = 100

// Break only if a calculated amount is negative
// Expression: CalculatedAmount < 0

// Break only if a variable is initialized
// Expression: MyVariable <> ''

// Break when a record's field has a specific value AND another variable is true
// Expression: Rec."Document Type" = Rec."Document Type"::Order AND IsValidationRequired

**The Secret:** Use conditional breakpoints to skip through thousands of irrelevant executions and land exactly on the problematic scenario. Think about the *conditions* under which the bug occurs, and translate those into an AL expression. This is far faster than repeatedly hitting F5/F10.

## Logpoints: Tracing Without Stopping

Sometimes, you don't want to stop execution; you just want to know the value of a variable or confirm that a certain part of the code was reached without interrupting the flow. Stepping through code can sometimes even *change* the behavior of timing-sensitive bugs.

**Logpoints** (also called "Tracepoints" in some environments) allow you to output a message to the debug console when a line is hit, including the value of variables, without pausing execution.

In VS Code, when you right-click on a breakpoint and select "Edit Breakpoint...", you can change the dropdown from "Expression" to "Log Message". You can include variable names wrapped in curly braces \`{}\` in the message.

// Example of a Log Message (Logpoint)
// Output the current Customer No. and the calculated amount
// Message: Processing Customer: {Rec."No."}, Amount: {CalculatedAmount}

// Output the status of a boolean variable
// Message: IsProcessingComplete is {IsProcessingComplete}

// Output entry/exit of a function (place at start and end)
// Message: Entering MyProcessingFunction for Record {Rec.RecordId}
// Message: Exiting MyProcessingFunction

// Output a simple marker to show execution path
// Message: ## Reached validation step ##

**The Secret:** Use logpoints for non-intrusive tracing. They are invaluable for understanding the execution flow in complex, long-running processes or for gathering data points across many iterations or records without manually stepping through each one. You can quickly see patterns or unexpected values scrolling through the debug console.

## Call Stack Analysis: Understanding the "How Did I Get Here?"

When your code hits an error or a breakpoint, the "Call Stack" window is your history book. It shows the sequence of function calls that led to the current point. Many developers glance at it, but truly *analyzing* the call stack can reveal the root cause of an issue that isn't obvious from the local variables alone.

Look at the sequence: Which events fired? Which functions called which other functions? Did the call originate from a user action, a web service call, a job queue entry? Understanding the *path* of execution is critical, especially in an event-driven system like Business Central.

**The Secret:** Don't just see *what* function is executing; understand the *context* of the call. A function might behave differently when called from a validation trigger on a page versus a direct call from a report or API. The call stack tells you that context. Look for unexpected call sequences or recursive calls that might indicate a design flaw or infinite loop.

## Debugging in the Cloud (SaaS): Telemetry is Your Lifeline

Directly attaching a debugger to a production SaaS environment for extensive step-through debugging is often not feasible or advisable. This is where **telemetry** becomes your primary debugging tool.

Business Central emits a wealth of telemetry data to Azure Application Insights – about errors, performance, page views, report executions, and critically, *extension event subscribers*.

By adding custom dimensions to your own code (e.g., logging key variable values or progress points via codeunits like \`SessionSettings\` or using dedicated logging patterns), you can enrich this telemetry. When a bug occurs, you analyze the logs in Application Insights to see the sequence of events, the values of your custom dimensions, and the exact error details leading up to the issue.

**The Secret:** Proactive telemetry instrumentation is essential for debugging in SaaS production. Don't wait for a bug to start thinking about logging. Design your code to emit useful data points that will help you diagnose problems remotely. Learn Kusto Query Language (KQL) to effectively query your Application Insights data.

## Going Deeper: Analyzing Queries and Locks

Performance debugging overlaps heavily with bug hunting. Slowness can often expose underlying data or logic issues. Tools like the AL Profiler (mentioned in our performance post) can not only find slow code but also reveal excessive database calls or locking waits that are part of a bug scenario (e.g., a process blocking itself).

In sandbox or on-prem environments, you might have access to SQL Server Management Studio to look at active queries, locks, and query plans, giving you an even lower-level view of what AL is doing to the database.

**The Secret:** For the toughest bugs involving data interaction or concurrency, combine AL debugging tools with database monitoring tools. See the AL call stack and variables *alongside* the SQL queries being executed and the locks being held. This holistic view is often necessary to pinpoint deadlocks, race conditions, or data inconsistencies caused by complex AL logic.

## Conclusion: Elevate Your Debugging Game

Debugging is a fundamental skill, but mastering it requires going beyond the basics. Conditional breakpoints offer precision, logpoints provide unobtrusive tracing, call stack analysis reveals context, and telemetry is your eye in the production sky. Combine these with an understanding of database interaction, and you become a formidable bug hunter.

Don't fear the bug; understand it. With these advanced techniques, you're well-equipped to tackle the most elusive issues in Business Central and ensure your solutions are robust and reliable.

What's the most challenging bug you've ever solved in Business Central, and what technique finally cracked it? Share your stories and tips in the comments!

---`,Oa=`# Debugging em AL: Escapar da Zona de Conforto do F9 – Técnicas Avançadas para Bugs Elusivos

Todo developer AL conhece a tecla F9. É a nossa companheira fiel, definindo breakpoints para pausar a execução e espreitar o estado do nosso código. Para bugs simples, alguns F9s e F10s bem colocados são frequentemente suficientes.

Mas e quanto a esses *outros* bugs? Aqueles que só acontecem ocasionalmente, num ambiente específico, sob condições estranhas, ou profundamente dentro de um processo complexo onde stepping linha por linha levaria horas? Confiar apenas em breakpoints básicos nestes cenários é como tentar caçar um fantasma com uma lanterna.

Para combater eficazmente bugs elusivos no Business Central, é preciso escapar da zona de conforto do F9 simples. Precisam de um conjunto de ferramentas mais sofisticado. Trata-se de transformar o debugging de uma tarefa reativa numa investigação proativa, munidos de técnicas que vos dão precisão cirúrgica e insights mais profundos.

Vamos explorar algumas técnicas avançadas de debugging em AL que podem poupar-vos horas de frustração e tornar-vos o caçador de bugs de referência na vossa equipa.

## Breakpoints Condicionais: O Vosso Ataque Cirúrgico

Definir um breakpoint é fácil. Mas e se quiserem apenas pausar a execução *quando* uma condição específica for cumprida? Por exemplo, só quando uma determinada variável atinge um valor particular, quando um registo tem um ID específico, ou quando um loop atinge uma determinada iteração?

É aqui que entram os **breakpoints condicionais**. Em vez de quebrar sempre que a linha é atingida, adicionam uma expressão que deve avaliar para \`true\` para o breakpoint ser acionado. Isto é incrivelmente poderoso ao fazer debugging de loops, processamento de registos específicos dentro de um conjunto maior, ou erros que só se manifestam com dados particulares.

No VS Code, podem clicar com o botão direito num breakpoint (o ponto vermelho) e selecionar "Edit Breakpoint...". Aqui podem inserir uma expressão AL.

// Exemplo de uma Expressão de Breakpoint Condicional
// Quebrar apenas quando o Nº de Cliente for 'C00050'
// Expressão: Rec."No." = 'C00050'

// Quebrar apenas ao processar o 100º cliente num loop
// Expressão: Rec.SystemId = LoopCustomer.SystemId AND LoopCounter = 100

// Quebrar apenas se um montante calculado for negativo
// Expressão: CalculatedAmount < 0

// Quebrar apenas se uma variável for inicializada
// Expressão: MyVariable <> ''

// Quebrar quando o campo de um registo tem um valor específico E outra variável é verdadeira
// Expressão: Rec."Document Type" = Rec."Document Type"::Order AND IsValidationRequired

**O Segredo:** Usem breakpoints condicionais para saltar milhares de execuções irrelevantes e aterrar exatamente no cenário problemático. Pensem nas *condições* sob as quais o bug ocorre, e traduzam-nas para uma expressão AL. Isto é muito mais rápido do que carregar repetidamente em F5/F10.

## Logpoints: Rastrear Sem Parar

Às vezes, não querem parar a execução; querem apenas saber o valor de uma variável ou confirmar que uma certa parte do código foi alcançada sem interromper o fluxo. Stepping através do código pode, por vezes, até *mudar* o comportamento de bugs sensíveis ao tempo.

**Logpoints** (também chamados "Tracepoints" em alguns ambientes) permitem gerar uma mensagem para a consola de debugging quando uma linha é atingida, incluindo o valor de variáveis, sem pausar a execução.

No VS Code, quando clicam com o botão direito num breakpoint e selecionam "Edit Breakpoint...", podem mudar a lista pendente de "Expression" para "Log Message". Podem incluir nomes de variáveis envolvidos em chavetas \`{}\` na mensagem.

// Exemplo de uma Mensagem de Log (Logpoint)
// Output o Nº de Cliente atual e o montante calculado
// Mensagem: A processar Cliente: {Rec."No."}, Montante: {CalculatedAmount}

// Output o estado de uma variável booleana
// Mensagem: IsProcessingComplete é {IsProcessingComplete}

// Output a entrada/saída de uma função (colocar no início e fim)
// Mensagem: A entrar em MyProcessingFunction para o Registo {Rec.RecordId}
// Mensagem: A sair de MyProcessingFunction

// Output um marcador simples para mostrar o caminho de execução
// Mensagem: ## Passo de validação alcançado ##

**O Segredo:** Usem logpoints para rastreamento não intrusivo. São inestimáveis para compreender o fluxo de execução em processos complexos e de longa duração, ou para recolher pontos de dados ao longo de muitas iterações ou registos sem ter de fazer stepping manual em cada um. Podem ver rapidamente padrões ou valores inesperados a scrollar na consola de debugging.

## Análise da Call Stack: Compreender o "Como Cheguei Aqui?"

Quando o vosso código atinge um erro ou um breakpoint, a janela "Call Stack" é o vosso livro de história. Mostra a sequência de chamadas de função que levou ao ponto atual. Muitos developers olham para ela, mas *analisar* verdadeiramente a call stack pode revelar a causa raiz de um problema que não é óbvia apenas pelas variáveis locais.

Olhem para a sequência: Quais eventos foram disparados? Quais funções chamaram quais outras funções? A chamada originou-se de uma ação do utilizador, uma chamada de web service, uma entrada da Job Queue? Compreender o *caminho* da execução é crítico, especialmente num sistema orientado a eventos como o Business Central.

**O Segredo:** Não vejam apenas *qual* função está a executar; compreendam o *contexto* da chamada. Uma função pode comportar-se de forma diferente quando chamada de um trigger de validação numa página versus uma chamada direta de um relatório ou API. A call stack diz-vos esse contexto. Procurem sequências de chamadas inesperadas ou chamadas recursivas que possam indicar uma falha de design ou um loop infinito.

## Debugging na Cloud (SaaS): Telemetria é a Vossa Linha de Vida

Anexar diretamente um debugger a um ambiente SaaS de produção para debugging passo a passo extensivo não é frequentemente viável ou aconselhável. É aqui que a **telemetria** se torna a vossa ferramenta primária de debugging.

O Business Central emite uma riqueza de dados de telemetria para o Azure Application Insights – sobre erros, desempenho, visualizações de páginas, execuções de relatórios e, crucialmente, *subscritores de eventos de extensão*.

Ao adicionar dimensões personalizadas ao vosso próprio código (por exemplo, registando valores chave de variáveis ou pontos de progresso via codeunits como \`SessionSettings\` ou usando padrões de logging dedicados), podem enriquecer esta telemetria. Quando ocorre um bug, analisam os logs no Application Insights para ver a sequência de eventos, os valores das vossas dimensões personalizadas e os detalhes exatos do erro que levaram ao problema.

**O Segredo:** Instrumentação proativa de telemetria é essencial para debugging em produção SaaS. Não esperem por um bug para começar a pensar em logging. Desenhem o vosso código para emitir pontos de dados úteis que vos ajudarão a diagnosticar problemas remotamente. Aprendam Kusto Query Language (KQL) para consultar eficazmente os vossos dados no Application Insights.

## Indo Mais Fundo: Analisar Queries e Bloqueios

O debugging de desempenho sobrepõe-se fortemente à caça de bugs. A lentidão pode frequentemente expor problemas subjacentes de dados ou lógica. Ferramentas como o AL Profiler (mencionado no nosso post sobre desempenho) podem não só encontrar código lento, mas também revelar chamadas excessivas à base de dados ou esperas por bloqueio que fazem parte de um cenário de bug (por exemplo, um processo a bloquear a si próprio).

Em ambientes sandbox ou on-premise, podem ter acesso ao SQL Server Management Studio para ver queries ativas, bloqueios e planos de query, dando-vos uma visão ainda mais de baixo nível do que o AL está a fazer na base de dados.

**O Segredo:** Para os bugs mais difíceis envolvendo interação de dados ou concorrência, combinem ferramentas de debugging AL com ferramentas de monitorização de base de dados. Vejam a call stack AL e variáveis *juntamente com* as queries SQL a serem executadas e os bloqueios a serem mantidos. Esta visão holística é frequentemente necessária para identificar deadlocks, race conditions, ou inconsistências de dados causadas por lógica AL complexa.

## Conclusão: Elevar o Vosso Jogo de Debugging

Debugging é uma habilidade fundamental, mas dominá-la exige ir além do básico. Breakpoints condicionais oferecem precisão, logpoints fornecem rastreamento não intrusivo, a análise da call stack revela contexto, e a telemetria é o vosso olho no céu da produção. Combinem estas com uma compreensão da interação com a base de dados, e tornar-se-ão caçadores de bugs formidáveis.

Não temam o bug; compreendam-no. Com estas técnicas avançadas, estão bem equipados para enfrentar os problemas mais elusivos no Business Central e garantir que as vossas soluções são robustas e fiáveis.

Qual foi o bug mais desafiador que já resolveram no Business Central, e que técnica finalmente o desvendou? Partilhem as vossas histórias e dicas nos comentários!

---`,qa=`# AL Integrations: Beyond the Basics - Building Robust External Connections

Connecting Business Central to the outside world is a fundamental requirement for modern ERP systems. Whether it's syncing with a CRM, sending data to a data warehouse, integrating with e-commerce platforms, or using external services for calculations, integrations are everywhere.

AL provides the \`HttpClient\`, \`HttpRequestMessage\`, \`HttpResponseMessage\`, and \`Json*\` data types to facilitate these connections. Basic GET and POST requests sending simple JSON are relatively straightforward. But real-world integrations are messy. External services go down, APIs change, authentication is complex, data volumes are large, and errors happen.

Building truly *robust* and *reliable* integrations in AL requires moving beyond the basic syntax and adopting patterns that account for these real-world challenges. Let's dive into some advanced aspects of AL integrations.

## Handling External Service Failures and Retries

External APIs are not 100% reliable. Network glitches, service downtime, or transient errors are common. Your integration must anticipate failure. Simply calling an \`HttpClient.Send()\` and throwing an \`ERROR\` if the response isn't 200 is insufficient.

A robust integration needs:
1.  **Graceful Error Handling:** Capture the error details (status code, response body) without crashing the entire Business Central process.
2.  **Retry Logic:** For transient errors (like 429 Too Many Requests or 5xx server errors), implement a retry mechanism, often with an exponential backoff delay.
3.  **Logging:** Log failures with enough detail to diagnose the issue later.
4.  **Monitoring & Alerting:** Ideally, have a way to monitor failed integrations and be alerted.

// Conceptual Integration Service with Retry Logic
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
        BaseDelay: Integer; // milliseconds
        Success: Boolean;
    begin
        MaxAttempts := 5; // Example: Try up to 5 times
        BaseDelay := 200; // Example: Start with 200ms delay

        RequestUrl := 'https://external.service.com/api/data'; // Example URL

        // Prepare the request message (e.g., set Method, Headers, Content)
        Request.Method := 'POST';
        Request.SetRequestUri(RequestUrl);
        Request.Content := CreateRequestContent(); // Helper function to create HttpContent

        Success := false;
        Attempts := 0;
        REPEAT
            Attempts += 1;
            ClearLastError(); // Clear any previous errors before retry

            if Client.Send(Request, Response) then begin
                if Response.IsSuccessStatusCode() then begin
                    // Success!
                    Success := true;
                    // Process Response.Content
                    ProcessResponseContent(Response.Content); // Helper function
                end else begin
                    // Received non-success status code
                    LogIntegrationFailure(RequestUrl, Response.StatusCode, Response.ReasonPhrase, Response.Content); // Log details
                    if CanRetryStatusCode(Response.StatusCode) and (Attempts < MaxAttempts) then begin
                        // Delay before retrying
                        Sleep(BaseDelay * Power(2, Attempts - 1)); // Exponential backoff
                    end else begin
                        // Non-retryable error or max attempts reached
                        ERROR('Integration failed after %1 attempts. Status: %2 %3', Attempts, Response.StatusCode, Response.ReasonPhrase);
                    end;
                end;
            end else begin
                // Network error or other client-side issue
                LogIntegrationFailure(RequestUrl, 0, '', GetLastErrorText()); // Log error details
                if Attempts < MaxAttempts then begin
                     // Delay before retrying
                     Sleep(BaseDelay * Power(2, Attempts - 1)); // Exponential backoff
                end else begin
                    ERROR('Integration failed after %1 attempts due to network error: %2', Attempts, GetLastErrorText());
                end;
            end;

        UNTIL Success OR (Attempts >= MaxAttempts AND NOT CanRetryStatusCode(Response.StatusCode)); // Exit if successful or max attempts reached for a retryable error, OR non-retryable error occurred

        if NOT Success then
             ERROR('Integration ultimately failed after %1 attempts.', MaxAttempts); // Final error if loop exited without success

    end;

    local procedure CreateRequestContent(): HttpContent;
    begin
        // Create and return HttpContent (e.g., JsonContent, TextContent)
        // Example: JsonContent.WriteFrom(MyRecord);
        // exit(JsonContent);
    end;

    local procedure ProcessResponseContent(Content: HttpContent);
    begin
        // Read and process Response.Content
        // Example: Content.ReadAs(MyJsonToken);
        // Use JsonToken.ReadValue() or JsonObject.Get() etc.
    end;

    local procedure LogIntegrationFailure(Url: Text; StatusCode: Integer; Reason: Text; Content: HttpContent);
    begin
        // Implement logging logic here
        // Log Url, StatusCode, Reason, and maybe content for diagnosis
        // Use Error codeunits, custom log tables, or telemetry (SessionSettings.LogMessage)
    end;

    local procedure CanRetryStatusCode(StatusCode: Integer): Boolean;
    begin
        // Define which status codes are considered transient and safe to retry
        case StatusCode of
            429, // Too Many Requests
            500, // Internal Server Error
            502, // Bad Gateway
            503, // Service Unavailable
            504: // Gateway Timeout
                exit(true);
            else
                exit(false);
        end;
    end;
}

As discussed in our post on [Events and Subscribers](/my-cv/blog/bc-events-subscribers), using a **queuing mechanism** is often the best pattern here. The event or trigger queues the request, and a separate process (like a Job Queue) attempts the external call, handling retries and logging failures without impacting the user or the original transaction.

## Managing Large Data Payloads

Sending or receiving large amounts of data via APIs can strain system resources and hit limitations. You might encounter memory issues, timeouts, or performance problems.

Techniques for large payloads:
* **Pagination:** If the external API supports it, retrieve data in smaller chunks using pagination parameters.
* **Streaming:** For sending large request bodies, consider if the API or \`HttpClient\` supports streaming the data rather than loading the entire payload into memory at once.
* **Compression:** Use compression (like GZIP) if supported by both ends to reduce the amount of data transferred over the network.
* **Background Processing:** As with other large data operations ([Data Operations and Transactions](/my-cv/blog/bc-al-data-transactions)), offload the processing of large responses or the sending of large requests to a background session or Job Queue.
* **Process Data Iteratively:** When receiving large responses, process the data within the response body iteratively rather than loading the entire JSON or XML into AL variables if possible. Use \`JsonToken\` or XML stream readers.

## Navigating Authentication Complexities (OAuth 2.0)

Simple API key or Basic authentication is rare for secure, modern APIs. OAuth 2.0 is the de facto standard, involving multiple steps to obtain an access token. Implementing the OAuth flow from AL requires careful handling of HTTP requests to an identity provider (like Azure AD) to get the token, storing and refreshing the token, and including it correctly in subsequent API calls.

This often involves:
* Sending a POST request to a token endpoint with client credentials (Client ID, Client Secret) and scope.
* Handling the JSON response containing the \`access_token\` and \`refresh_token\`.
* Storing the token securely (e.g., in a setup table, possibly encrypted).
* Including the \`access_token\` in the \`Authorization: Bearer <token>\` header of API calls.
* Implementing logic to check token expiry and use the \`refresh_token\` to obtain a new access token without re-authenticating the user.

// Conceptual OAuth 2.0 Token Management Codeunit
codeunit 50310 "OAuth Token Manager"
{
    // Store these securely (Setup table, possibly encrypted)
    var
        ClientId: Text;
        ClientSecret: Text;
        TokenEndpointUrl: Text;
        Scope: Text;

        // Store the obtained token and refresh token
        AccessToken: Text;
        RefreshToken: Text;
        TokenExpiryDateTime: DateTime; // Track expiry

        Client: HttpClient; // Re-using HttpClient

    procedure GetAccessToken(): Text
    begin
        // Check if token is expired or needs refreshing
        if AccessToken = '' or (TokenExpiryDateTime < CurrentDateTime + 10S) then begin // Refresh if expired or expiring soon (10 seconds buffer)
            if RefreshToken <> '' then begin
                // Try to refresh using the refresh token
                if TryRefreshToken() then
                    exit(AccessToken) // Refresh successful
                else begin
                    // Refresh failed, need to get a new token using credentials
                    if TryGetNewTokenWithCredentials() then
                         exit(AccessToken) // New token successful
                    else
                         error('Failed to get or refresh OAuth token.'); // Both methods failed
                end;
            end else begin
                 // No refresh token, need to get a new token using credentials
                 if TryGetNewTokenWithCredentials() then
                    exit(AccessToken) // New token successful
                 else
                    error('Failed to get OAuth token with credentials.'); // Failed to get new token
            end;
        end else begin
            // Token is still valid
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
        // Prepare request to token endpoint using client credentials (Grant Type: client_credentials or password flow, etc.)
        Request.Method := 'POST';
        Request.SetRequestUri(TokenEndpointUrl);
        Request.GetHeaders().Add('Content-Type', 'application/x-www-form-urlencoded'); // Or application/json depending on endpoint

        // Example body for client_credentials flow
        Content.WriteString(StrSubstNo('grant_type=client_credentials&client_id=%1&client_secret=%2&scope=%3',
                                     ClientId, ClientSecret, Scope));
        Request.Content := Content;

        IsSuccessful := false;
        if Client.Send(Request, Response) then begin
            if Response.IsSuccessStatusCode() then begin
                if Response.Content.ReadAs(JsonObj) then begin
                    // Parse the response
                    if JsonObj.Get('access_token', AccessToken) and JsonObj.Get('refresh_token', RefreshToken) then begin
                        // Assume 'expires_in' is in seconds
                        if JsonObj.Get('expires_in', JsonToken.Integer) then
                             TokenExpiryDateTime := CurrentDateTime + JsonToken.Integer * 1000; // Calculate expiry
                        else
                             TokenExpiryDateTime := CurrentDateTime + 3600 * 1000; // Default if no expiry (e.g., 1 hour)

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
        // Prepare request to token endpoint using refresh token (Grant Type: refresh_token)
        Request.Method := 'POST';
        Request.SetRequestUri(TokenEndpointUrl);
        Request.GetHeaders().Add('Content-Type', 'application/x-www-form-urlencoded');

        Content.WriteString(StrSubstNo('grant_type=refresh_token&refresh_token=%1&client_id=%2&client_secret=%3',
                                     RefreshToken, ClientId, ClientSecret)); // Client secret often required for refresh
        Request.Content := Content;

        IsSuccessful := false;
        if Client.Send(Request, Response) then begin
            if Response.IsSuccessStatusCode() then begin
                if Response.Content.ReadAs(JsonObj) then begin
                     // Parse the response - should get new access_token and refresh_token
                     if JsonObj.Get('access_token', AccessToken) and JsonObj.Get('refresh_token', RefreshToken) then begin
                         if JsonObj.Get('expires_in', JsonToken.Integer) then
                             TokenExpiryDateTime := CurrentDateTime + JsonToken.Integer * 1000
                         else
                             TokenExpiryDateTime := CurrentDateTime + 3600 * 1000; // Default

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
         // Implement logging for OAuth failures
         // Use SessionSettings.LogMessage or custom log table
    end;

    // This codeunit would be used by your integration codeunits:
    // var
    //    OAuthManager: Codeunit "OAuth Token Manager";
    //    AccessToken: Text;
    //    Request: HttpRequestMessage;
    // begin
    //    AccessToken := OAuthManager.GetAccessToken(); // Get a valid token
    //    Request.GetHeaders().Add('Authorization', StrSubstNo('Bearer %1', AccessToken)); // Add token to request header
    //    // ... then send the request ...
    // end;
}

**The Secret:** Don't hardcode credentials in your code. Use setup tables. Abstract the OAuth flow into a dedicated codeunit or service that handles obtaining, storing, refreshing, and providing access tokens on demand. This keeps your core integration logic clean and secure.

## API Versioning and Change Management

External APIs evolve. New versions are released, endpoints change, or data structures are modified. How does your AL integration adapt?

* **Specify API Version:** Always specify the API version you are targeting in your requests (often in the URL or headers). This prevents unexpected breaks when the external service releases a new version you're not ready for.
* **Defensive Data Handling:** When processing JSON or XML responses, handle potential missing fields or unexpected data types gracefully. Check if elements exist before trying to access their values. Use \`JsonToken.ReadValue()\` with type checking or \`JsonValue.IsType()\` to validate data.
* **Wrapper Codeunits:** As discussed with base app interactions ([our post on Interface Thinking in AL](/my-cv/blog/bc-al-interfaces)), wrap external API calls in your own service codeunits or interfaces. If the external API changes, you update only your wrapper codeunit, not every place that called the API.

**The Secret:** Treat external APIs like external contracts. Pin to specific versions, validate data received, and use wrapper codeunits to insulate your core logic from external changes.

## Conclusion: Master the Art of Connection

Building robust external integrations in Business Central AL is a critical skill that extends far beyond basic HTTP requests. It requires planning for failure with retry logic, managing data volumes, securely handling complex authentication like OAuth, and designing for change via API versioning and wrapper codeunits.

By implementing these advanced patterns, you can build integrations that are not only functional but also resilient, maintainable, and trustworthy under real-world conditions. Don't let the complexities of the outside world break your Business Central solution.

What's your toughest integration challenge in AL, and what patterns have you found most effective? Share your insights below!

---`,Da=`# Integrações AL: Para Lá do Básico - Construir Conexões Externas Robustas

Conectar o Business Central ao mundo exterior é um requisito fundamental para sistemas ERP modernos. Seja sincronizando com um CRM, enviando dados para um data warehouse, integrando com plataformas de e-commerce, ou usando serviços externos para cálculos, as integrações estão por toda parte.

O AL fornece os tipos de dados \`HttpClient\`, \`HttpRequestMessage\`, \`HttpResponseMessage\` e \`Json*\` para facilitar estas conexões. Pedidos básicos GET e POST enviando JSON simples são relativamente diretos. Mas integrações do mundo real são complicadas. Serviços externos ficam offline, APIs mudam, autenticação é complexa, volumes de dados são grandes e erros acontecem.

Construir integrações verdadeiramente *robustas* e *fiáveis* em AL exige ir além da sintaxe básica e adotar padrões que considerem estes desafios do mundo real. Vamos mergulhar em alguns aspetos avançados das integrações AL.

## Lidar com Falhas de Serviços Externos e Retries

APIs externas não são 100% fiáveis. Falhas de rede, tempo de inatividade do serviço, ou erros transientes são comuns. A vossa integração deve antecipar falhas. Simplesmente chamar um \`HttpClient.Send()\` e lançar um \`ERROR\` se a resposta não for 200 é insuficiente.

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

Como discutido no nosso post sobre [Eventos e Subscritores](/my-cv/blog/bc-events-subscribers), usar um **mecanismo de fila** é frequentemente o melhor padrão aqui. O evento ou trigger enfileira o pedido, e um processo separado (como uma Job Queue) tenta a chamada externa, tratando retries e registando falhas sem impactar o utilizador ou a transação original.

## Gerir Grandes Payloads de Dados

Enviar ou receber grandes quantidades de dados via APIs pode sobrecarregar os recursos do sistema e atingir limitações. Podem encontrar problemas de memória, timeouts, ou problemas de desempenho.

Técnicas para grandes payloads:
* **Paginação:** Se a API externa suportar, recuperar dados em pedaços menores usando parâmetros de paginação.
* **Streaming:** Para enviar corpos de pedido grandes, considerar se a API ou \`HttpClient\` suporta streaming dos dados em vez de carregar o payload inteiro para a memória de uma vez.
* **Compressão:** Usar compressão (como GZIP) se suportado por ambas as partes para reduzir a quantidade de dados transferidos pela rede.
* **Processamento em Segundo Plano:** Tal como com outras operações de grandes volumes de dados ([Operações de Dados e Transações](/my-cv/blog/bc-al-data-transactions)), descarregar o processamento de grandes respostas ou o envio de grandes pedidos para uma sessão em segundo plano ou Job Queue.
* **Processar Dados Iterativamente:** Ao receber grandes respostas, processar os dados dentro do corpo da resposta iterativamente, em vez de carregar o JSON ou XML inteiro para variáveis AL, se possível. Usem \`JsonToken\` ou leitores de stream XML.

## Navegar Complexidades de Autenticação (OAuth 2.0)

Chave de API simples ou autenticação Básica são raras para APIs seguras e modernas. OAuth 2.0 é o padrão de facto, envolvendo múltiplos passos para obter um token de acesso. Implementar o fluxo OAuth a partir de AL requer um tratamento cuidadoso dos pedidos HTTP para um provedor de identidade (como Azure AD) para obter o token, armazenar e refrescar o token, e incluí-lo corretamente em chamadas de API subsequentes.

Isto frequentemente envolve:
* Enviar um pedido POST para um endpoint de token com credenciais de cliente (Client ID, Client Secret) e scope.
* Lidar com a resposta JSON contendo o \`access_token\` e \`refresh_token\`.
* Armazenar o token de forma segura (por exemplo, numa tabela de setup, possivelmente encriptada).
* Incluir o \`access_token\` no cabeçalho \`Authorization: Bearer <token>\` das chamadas de API.
* Implementar lógica para verificar a expiração do token e usar o \`refresh_token\` para obter um novo access token sem ter de reautenticar o utilizador.

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
* **Tratamento Defensivo de Dados:** Ao processar respostas JSON ou XML, lidem graciosamente com potenciais campos em falta ou tipos de dados inesperados. Verifiquem se os elementos existem antes de tentar aceder aos seus valores. Usem \`JsonToken.ReadValue()\` com verificação de tipo ou \`JsonValue.IsType()\` para validar dados.
* **Codeunits Wrapper:** Tal como discutido com interações da base app ([Pensamento de Interface em AL](/my-cv/blog/bc-al-interfaces)), envolvam as chamadas de API externas nas vossas próprias codeunits ou interfaces de serviço. Se a API externa mudar, atualizam apenas a vossa codeunit wrapper, não todos os locais que chamaram a API.

**O Segredo:** Tratem APIs externas como contratos externos. Ancorar a versões específicas, validar dados recebidos e usar codeunits wrapper para isolar a vossa lógica central de mudanças externas.

## Conclusão: Dominar a Arte da Conexão

Construir integrações externas robustas em Business Central AL é uma habilidade crítica que se estende muito para lá de pedidos HTTP básicos. Exige planear para falhas com lógica de retry, gerir volumes de dados, lidar de forma segura com autenticação complexa como OAuth, e desenhar para mudança através de versionamento de API e codeunits wrapper.

Ao implementar estes padrões avançados, podem construir integrações que não são apenas funcionais, mas também resilientes, fáceis de manter e fiáveis sob condições do mundo real. Não deixem que as complexidades do mundo exterior quebrem a vossa solução Business Central.

Qual é o vosso desafio de integração mais difícil em AL, e que padrões encontraram mais eficazes? Partilhem os vossos insights abaixo!

---`,Na=`# Taming Transactions and Data Operations in AL: Ensuring Integrity and Performance

At the heart of any ERP system is data. Creating, reading, updating, and deleting records are fundamental operations in Business Central development. But as processes become more complex, involving multiple record changes across different tables, the seemingly simple act of handling data can become a minefield of potential issues: data inconsistencies, deadlocks, partial updates, and performance bottlenecks.

Understanding how Business Central manages transactions and how your AL code influences these processes is critical for building robust applications. It's not just about the \`INSERT\` or \`MODIFY\` statement; it's about the transactional scope, locking behavior, and the often-misunderstood \`COMMIT\`.

Let's dive deep into managing data operations and transactions in AL, exploring patterns to ensure data integrity and maintain performance, even when dealing with high volumes or complex interdependencies.

## The AL Transaction Model: Simpler, But Still Tricky

Business Central AL transactions are, by design, simpler than direct SQL transactions. Every AL codeunit or report execution typically runs within an implicit transaction. Changes are accumulated and only made permanent when the transaction is committed.

The key is understanding the **COMMIT** statement. It explicitly ends the current transaction and starts a new one. All pending data changes since the last \`COMMIT\` (or the start of the process) are written to the database.

Sounds straightforward? The complexity arises when:
1.  You have nested codeunit calls.
2.  You use \`COMMIT\` within a long-running loop.
3.  Errors occur *after* a \`COMMIT\`.
4.  Different processes interact with the same data (locking).

## The Pitfalls of \`COMMIT\` in Loops

A classic anti-pattern in AL is placing a \`COMMIT\` inside a loop that processes many records:

// Bad Practice: COMMIT inside a loop
procedure ProcessManyRecordsBad()
var
    MyRecord: Record "My Large Table";
    Counter: Integer;
begin
    Counter := 0;
    MyRecord.SETFILTER(...); // Filters to get many records
    IF MyRecord.FINDSET THEN BEGIN
        REPEAT
            // --- Start work on one record ---
            Counter += 1;
            // ... perform calculations ...
            // ... modify MyRecord ...
            MyRecord.MODIFY();
            // ... maybe perform related inserts/modifies in other tables ...

            IF (Counter MOD 100) = 0 THEN BEGIN
                // BAD: Committing inside the loop
                COMMIT; // Writes the last 100 records, starts a new transaction
                // If an error happens *after* this, the first 'Counter' records are saved, the rest are lost
            END;
            // --- End work on one record ---
        UNTIL MyRecord.NEXT = 0;
    END;

    // Final commit for any remaining records (if loop finished)
    COMMIT; // Might be okay here, but previous commits were problematic
end;

While this might seem like a good way to save progress or release locks periodically, it has significant drawbacks:
* **Performance:** Committing frequently is expensive. Each \`COMMIT\` involves flushing data to disk, acquiring/releasing locks, and communicating with the database. Doing this repeatedly in a loop adds significant overhead.
* **Data Inconsistency on Failure:** If an error occurs *after* a \`COMMIT* within the loop, all records processed *before* the \`COMMIT\` are saved, but the records *after* it are not. This leaves your data in an inconsistent state – a partial update has occurred. Rolling back the entire process becomes impossible.
* **Lock Contention:** While \`COMMIT\` releases *some* locks, frequent committing can still contribute to locking issues by constantly acquiring and releasing, potentially conflicting with other concurrent processes.

**The Secret:** Avoid \`COMMIT\` inside loops like the plague. A transaction should ideally encompass a complete, logical business operation. If a process is too long to run in a single transaction (due to potential lock duration), consider breaking it into smaller, independent operations managed by a Job Queue, where each Job Queue entry represents a single, committable unit of work.

## Ensuring Data Integrity: Atomic Operations and Error Handling

A fundamental principle is atomicity: a transaction should either complete entirely or not happen at all. All or nothing. If any part fails, the entire transaction should roll back.

AL provides error handling (\`ERROR\`, \`CLEARLASTERROR\`) which, when used correctly *within a transaction*, will trigger a rollback of all uncommitted changes.

// Good Practice: Atomic Transaction and Error Handling
procedure ProcessManyRecordsGood()
var
    MyRecord: Record "My Large Table";
begin
    // Entire process runs within a single implicit transaction
    MyRecord.SETFILTER(...); // Filters to get many records
    IF MyRecord.FINDSET THEN BEGIN
        REPEAT
            // --- Start work on one record ---
            // ... perform calculations ...
            // ... modify MyRecord ...
            MyRecord.MODIFY();
            // ... maybe perform related inserts/modifies in other tables ...

            // If any error occurs here or in subsequent related operations,
            // the 'ERROR' statement (or unhandled runtime error) will roll back
            // ALL uncommitted changes since the start of the process or the last COMMIT.
            // No partial updates.
            // IF SomeConditionFailed THEN
            //   ERROR('Condition failed for record %1', MyRecord.PrimaryKey);
            // --- End work on one record ---
        UNTIL MyRecord.NEXT = 0;
    END;

    // COMMIT at the very end if the *entire* process was successful
    // Or rely on the implicit commit when the codeunit finishes without error.
    COMMIT; // Explicitly commit if needed, but only after all operations are complete and successful.
end;

If an error occurs after a \`COMMIT\`, the standard AL error handling *cannot* roll back the changes made before that \`COMMIT\`. This reinforces why \`COMMIT\` should be used sparingly and only at logical transaction boundaries.

**The Secret:** Structure your AL code so that a complete business task occurs within a single transaction (the implicit one, or explicitly managed with \`COMMIT\` only at the very end if necessary). Use \`ERROR\` to halt the process and trigger a rollback if any step fails *before* the commit point.

## Handling Large Data Volumes Efficiently

Processing thousands or millions of records in AL requires more than just a \`FINDSET\` and a \`REPEAT...UNTIL\`. Memory usage, network traffic, and database load become critical factors.

Techniques for handling large volumes:
* **\`SETLOADFIELDS\`:** As discussed in the performance post, *always* use this when reading records in bulk to minimize data transfer.
* **Temporary Tables:** Use temporary tables to stage data, perform intermediate calculations, or filter down large datasets before processing the final results. Temporary tables reside in memory and don't involve database writes until you explicitly \`INSERT\` into a non-temporary table. Ensure you define keys on temporary tables if you'll be filtering or sorting them heavily.
* **Queries:** For complex aggregations or joins that would be inefficient to do record-by-record in AL, leverage Query objects. The database is optimized for set-based operations. Process the results of the query.
* **Bulk Inserts/Modifies:** While AL's \`MODIFYALL\` and \`DELETEALL\` are efficient for simple changes, complex bulk operations might require helper functions or patterns that minimize individual record operations within the loop.
* **Background Processes:** For extremely large volumes or long-running tasks, offload the work to a Job Queue entry or a background session to avoid blocking users and prevent UI timeouts. These background processes manage their own transactions.

**The Secret:** Don't treat large data like small data. Design specific patterns for volume. Use \`SETLOADFIELDS\`, leverage temporary tables and Queries for staging and aggregation, and know when to offload processing to background tasks.

## Locking and Concurrency: Avoiding Deadlocks

When multiple users or processes try to modify the same data simultaneously, locks are acquired. If processes request locks in an incompatible order, a **deadlock** can occur, where each process is waiting for the other to release a resource. Business Central detects these and typically terminates one of the processes with an error.

Your AL code influences locking behavior. \`FIND\`, \`FINDSET\`, \`FINDFIRST\`, \`NEXT\` acquire read locks. \`INSERT\`, \`MODIFY\`, \`DELETE\` acquire write locks. \`LOCKTABLE\` acquires an exclusive lock on the entire table (use with extreme caution!).

Avoiding deadlocks and reducing blocking requires careful design:
* **Minimize Transaction Duration:** Shorter transactions hold locks for less time, reducing the window for conflicts.
* **Access Resources Consistently:** If your code accesses multiple tables in a specific order, try to maintain that order across different processes that might touch the same tables. Consistent access patterns can help avoid deadlocks.
* **Use \`READISOLATION\` (Advanced):** For specific scenarios, you might use \`READISOLATION(Update)\`. This acquire an update lock when reading, preventing other processes from acquiring a write lock on the same record you're about to modify. This can prevent some deadlock scenarios but requires careful understanding.
* **Handle Errors and Retries:** Design processes that might encounter deadlocks (e.g., concurrent writes) to gracefully handle the error and potentially retry the operation.

**The Secret:** Be mindful of *when* and *where* your code acquires locks. Avoid holding locks over user interaction or external calls. Understand the potential for conflict in concurrent processes and design transaction boundaries and access patterns to minimize contention.

## Conclusion: Mastering the Data Layer

Effective Business Central development requires mastering the data layer. Understanding AL transactions, avoiding the pitfalls of \`COMMIT\` in loops, ensuring atomicity through proper error handling, designing for volume with techniques like \`SETLOADFIELDS\` and temporary tables, and being conscious of locking behavior are all crucial skills.

By adopting patterns that prioritize data integrity, minimize transaction durations, and handle large volumes efficiently, you build solutions that are not only functional but also performant and reliable under real-world load.

What are your go-to strategies for dealing with complex data operations or tricky transaction scenarios in AL? Share your expertise in the comments below!

---`,za=`# Dominar Transações e Operações de Dados em AL: Garantir Integridade e Desempenho

No coração de qualquer sistema ERP estão os dados. Criar, ler, atualizar e apagar registos são operações fundamentais no desenvolvimento em Business Central. Mas à medida que os processos se tornam mais complexos, envolvendo múltiplas mudanças de registo em diferentes tabelas, o ato aparentemente simples de lidar com dados pode tornar-se um campo minado de potenciais problemas: inconsistências de dados, deadlocks, atualizações parciais e estrangulamentos de desempenho.

Compreender como o Business Central gere transações e como o vosso código AL influencia estes processos é crítico para construir aplicações robustas. Não se trata apenas da instrução \`INSERT\` ou \`MODIFY\`; trata-se do âmbito transacional, comportamento de bloqueio e o frequentemente mal compreendido \`COMMIT\`.

Vamos mergulhar fundo na gestão de operações de dados e transações em AL, explorando padrões para garantir a integridade dos dados e manter o desempenho, mesmo ao lidar com grandes volumes ou interdependências complexas.

## O Modelo de Transação AL: Mais Simples, Mas Ainda Com Truques

As transações AL no Business Central são, por design, mais simples do que as transações SQL diretas. Cada codeunit AL ou execução de relatório geralmente corre dentro de uma transação implícita. As mudanças são acumuladas e só se tornam permanentes quando a transação é commitada.

A chave é compreender a instrução **COMMIT**. Ela termina explicitamente a transação atual e inicia uma nova. Todas as mudanças de dados pendentes desde o último \`COMMIT\` (ou o início do processo) são escritas na base de dados.

Parece simples? A complexidade surge quando:
1.  Têm chamadas aninhadas de codeunits.
2.  Usam \`COMMIT\` dentro de um loop de longa duração.
3.  Ocorrem erros *após* um \`COMMIT\`.
4.  Diferentes processos interagem com os mesmos dados (bloqueio).

## Os Perigos do \`COMMIT\` em Loops

Um anti-padrão clássico em AL é colocar um \`COMMIT\` dentro de um loop que processa muitos registos:

// Má Prática: COMMIT dentro de um loop
procedure ProcessManyRecordsBad()
var
    MyRecord: Record "My Large Table";
    Counter: Integer;
begin
    Counter := 0;
    MyRecord.SETFILTER(...); // Filtra para obter muitos registos
    IF MyRecord.FINDSET THEN BEGIN
        REPEAT
            // --- Começar trabalho num registo ---
            Counter += 1;
            // ... realizar cálculos ...
            // ... modificar MyRecord ...
            MyRecord.MODIFY();
            // ... talvez realizar inserts/modifies relacionados em outras tabelas ...

            IF (Counter MOD 100) = 0 THEN BEGIN
                // MAU: Commitar dentro do loop
                COMMIT; // Escreve os últimos 100 registos, inicia uma nova transação
                // Se ocorrer um erro *após* isto, os primeiros 'Counter' registos são guardados, o resto é perdido
            END;
            // --- Terminar trabalho num registo ---
        UNTIL MyRecord.NEXT = 0;
    END;

    // Commit final para quaisquer registos restantes (se o loop terminou)
    COMMIT; // Pode estar ok aqui, mas commits anteriores foram problemáticos
end;

Embora isto possa parecer uma boa forma de guardar progresso ou libertar bloqueios periodicamente, tem desvantagens significativas:
* **Desempenho:** Commitar frequentemente é caro. Cada \`COMMIT\` envolve descarregar dados para o disco, adquirir/libertar bloqueios e comunicar com a base de dados. Fazer isto repetidamente num loop adiciona uma sobrecarga significativa.
* **Inconsistência de Dados em Caso de Falha:** Se ocorrer um erro *após* um \`COMMIT* dentro do loop, todos os registos processados *antes* do \`COMMIT\` são guardados, mas os registos *após* ele não. Isto deixa os vossos dados num estado inconsistente – ocorreu uma atualização parcial. Reverter todo o processo torna-se impossível.
* **Contenção de Bloqueio:** Embora o \`COMMIT\` liberte *alguns* bloqueios, o commit frequente pode ainda contribuir para problemas de bloqueio ao adquirir e libertar constantemente, potencialmente entrando em conflito com outros processos concorrentes.

**O Segredo:** Evitem o \`COMMIT\` dentro de loops como a praga. Uma transação deve idealmente abranger uma operação de negócio completa e lógica. Se um processo for demasiado longo para correr numa única transação (devido à potencial duração do bloqueio), considerem dividi-lo em operações menores e independentes geridas por uma Job Queue, onde cada entrada da Job Queue representa uma unidade de trabalho única e commitável.

## Garantir a Integridade dos Dados: Operações Atómicas e Tratamento de Erros

Um princípio fundamental é a atomicidade: uma transação deve ou ser concluída totalmente ou não acontecer de todo. Tudo ou nada. Se alguma parte falhar, a transação inteira deve reverter.

O AL fornece tratamento de erros (\`ERROR\`, \`CLEARLASTERROR\`) que, quando usados corretamente *dentro de uma transação*, acionarão uma reversão de todas as mudanças não commited.

// Boa Prática: Transação Atómica e Tratamento de Erros
procedure ProcessManyRecordsGood()
var
    MyRecord: Record "My Large Table";
begin
    // Todo o processo corre dentro de uma única transação implícita
    MyRecord.SETFILTER(...); // Filtra para obter muitos registos
    IF MyRecord.FINDSET THEN BEGIN
        REPEAT
            // --- Começar trabalho num registo ---
            // ... realizar cálculos ...
            // ... modificar MyRecord ...
            MyRecord.MODIFY();
            // ... talvez realizar inserts/modifies relacionados em outras tabelas ...

            // Se ocorrer algum erro aqui ou em operações relacionadas subsequentes,
            // a instrução 'ERROR' (ou erro de runtime não tratado) acionará uma reversão
            // de TODAS as mudanças não commited desde o início do processo ou o último COMMIT.
            // Sem atualizações parciais.
            // IF AlgumaCondicaoFalhou THEN
            //   ERROR('Condição falhou para o registo %1', MyRecord.PrimaryKey);
            // --- Terminar trabalho num registo ---
        UNTIL MyRecord.NEXT = 0;
    END;

    // COMMIT apenas no final, se o processo *inteiro* for bem sucedido
    // Ou confiar no commit implícito quando a codeunit termina sem erro.
    COMMIT; // Commitar explicitamente se necessário, mas apenas após todas as operações estarem completas e bem sucedidas.
end;

Se ocorrer um erro após um \`COMMIT\`, o tratamento de erros AL padrão *não pode* reverter as mudanças feitas antes desse \`COMMIT\`. Isto reforça porque o \`COMMIT\` deve ser usado com moderação e apenas em limites de transação lógicos.

**O Segredo:** Estruturem o vosso código AL para que uma tarefa de negócio completa ocorra dentro de uma única transação (a implícita, ou gerida explicitamente com \`COMMIT\` apenas no final, se necessário). Usem \`ERROR\` para parar o processo e acionar uma reversão se algum passo falhar *antes* do ponto de commit.

## Lidar com Grandes Volumes de Dados Eficientemente

Processar milhares ou milhões de registos em AL exige mais do que apenas um \`FINDSET\` e um \`REPEAT...UNTIL\`. O uso de memória, tráfego de rede e carga na base de dados tornam-se fatores críticos.

Técnicas para lidar com grandes volumes:
* **\`SETLOADFIELDS\`:** Como discutido no post sobre desempenho, *sempre* usem isto ao ler registos em massa para minimizar a transferência de dados.
* **Tabelas Temporárias:** Usem tabelas temporárias para preparar dados, realizar cálculos intermédios ou filtrar grandes conjuntos de dados antes de processar os resultados finais. Tabelas temporárias residem na memória e não envolvem escritas na base de dados até inserirem explicitamente numa tabela não temporária. Garanta que define chaves em tabelas temporárias se as for filtrar ou ordenar intensamente.
* **Queries:** Para agregações complexas ou junções que seriam ineficientes de fazer registo por registo em AL, usem objetos Query. A base de dados é otimizada para operações baseadas em conjuntos. Processem os resultados da query.
* **Bulk Inserts/Modifies:** Embora \`MODIFYALL\` e \`DELETEALL\` do AL sejam eficientes para mudanças simples, operações complexas em massa podem exigir funções auxiliares ou padrões que minimizem as operações individuais de registo dentro do loop.
* **Processos em Segundo Plano:** Para volumes extremamente grandes ou tarefas de longa duração, descarreguem o trabalho para uma entrada da Job Queue ou uma sessão em segundo plano para evitar bloquear utilizadores e impedir timeouts na UI. Estes processos em segundo plano gerem as suas próprias transações.

**O Segredo:** Não tratem grandes volumes de dados como pequenos volumes. Desenhem padrões específicos para volume. Usem \`SETLOADFIELDS\`, usem tabelas temporárias e Queries para preparação e agregação, e saibam quando descarregar o processamento para tarefas em segundo plano.

## Bloqueio e Concorrência: Evitar Deadlocks

Quando múltiplos utilizadores ou processos tentam modificar os mesmos dados simultaneamente, são adquiridos bloqueios. Se os processos solicitarem bloqueios numa ordem incompatível, pode ocorrer um **deadlock**, onde cada processo está à espera que o outro liberte um recurso. O Business Central deteta isto e tipicamente termina um dos processos com um erro.

O vosso código AL influencia o comportamento de bloqueio. \`FIND\`, \`FINDSET\`, \`FINDFIRST\`, \`NEXT\` adquirem bloqueios de leitura. \`INSERT\`, \`MODIFY\`, \`DELETE\` adquirem bloqueios de escrita. \`LOCKTABLE\` adquire um bloqueio exclusivo na tabela inteira (usem com extrema cautela!).

Evitar deadlocks e reduzir o bloqueio exige um design cuidadoso:
* **Minimizar a Duração da Transação:** Transações mais curtas mantêm bloqueios por menos tempo, reduzindo a janela para conflitos.
* **Aceder a Recursos de Forma Consistente:** Se o vosso código aceder a várias tabelas numa ordem específica, tentem manter essa ordem em diferentes processos que possam tocar nas mesmas tabelas. Padrões de acesso consistentes podem ajudar a evitar deadlocks.
* **Usar \`READISOLATION\` (Avançado):** Para cenários específicos, podem usar \`READISOLATION(Update)\`. Isto adquire um bloqueio de atualização ao ler, impedindo que outros processos adquiram um bloqueio de escrita no mesmo registo que estão prestes a modificar. Isto pode prevenir alguns cenários de deadlock, mas exige uma compreensão cuidadosa.
* **Tratar Erros e Retentar:** Desenhem processos que possam encontrar deadlocks (por exemplo, escritas concorrentes) para tratar o erro graciosamente e potencialmente retentar a operação.

**O Segredo:** Estejam conscientes de *quando* e *onde* o vosso código adquire bloqueios. Evitem manter bloqueios durante interações do utilizador ou chamadas externas. Compreendam o potencial de conflito em processos concorrentes e desenhem limites de transação e padrões de acesso para minimizar a contenção.

## Conclusão: Dominar a Camada de Dados

O desenvolvimento eficaz em Business Central exige dominar a camada de dados. Compreender as transações AL, evitar os perigos do \`COMMIT\` em loops, garantir a atomicidade através do tratamento de erros adequado, desenhar para volume com técnicas como \`SETLOADFIELDS\` e tabelas temporárias, e estar consciente do comportamento de bloqueio são todas habilidades cruciais.

Ao adotar padrões que priorizam a integridade dos dados, minimizam a duração das transações e lidam com grandes volumes eficientemente, constroem soluções que não são apenas funcionais, mas também performáticas e fiáveis sob carga real.

Quais são as vossas estratégias de eleição para lidar com operações de dados complexas ou cenários de transação complicados em AL? Partilhem a vossa experiência nos comentários abaixo!

---`,Fa=`# Interface Thinking in AL: Designing for the Future of Your BC Extensions

Interfaces. They quietly arrived in AL, a new keyword in our language. For many, they might seem like just another syntax feature, perhaps used occasionally when following a specific pattern shown in documentation.

But I'm here to tell you that adopting an *interface-first mindset* is a fundamental shift that can elevate your Business Central extensions from functional code to truly robust, maintainable, and flexible applications designed for the long haul. It's not just about using the syntax; it's about *thinking* differently about your code's structure and dependencies.

Think about it: how often do you have codeunits that are tightly coupled to other concrete codeunits? If you need to swap out logic, add a new variation of a process, or write automated tests for a specific piece of business logic, you often find yourself entangled in a web of dependencies. This is where interfaces shine. They allow you to define a *contract* – what a piece of code *does* – without specifying *how* it does it.

Let's explore why embracing interface thinking is crucial for modern BC development and how it unlocks patterns that make your extensions easier to test, maintain, and evolve.

## Why Interfaces? The SOLID Principles Connection

Interfaces are a direct enabler of key software design principles, most notably from the SOLID acronym:

* **Dependency Inversion Principle (DIP):** High-level modules should not depend on low-level modules. Both should depend on abstractions (interfaces). Abstractions should not depend on details. Details should depend on abstractions. This is foundational for decoupling.
* **Interface Segregation Principle (ISP):** Clients should not be forced to depend on interfaces they do not use. Better to have many small, role-specific interfaces than one large, monolithic one.

By depending on interfaces instead of concrete implementations, your code becomes significantly less coupled. A codeunit that needs to perform a certain action depends only on an interface defining that action, not on the specific codeunit that currently implements it.

## Real-World Scenarios for Interface Power

Where can you apply this? Almost anywhere you have variations in logic or need to integrate with external systems.

Imagine needing different validation rules for different types of customers or documents. Without interfaces, you might have a large \`IF/ELSEIF\` block or a complex \`CASE\` statement checking types and calling specific validation codeunits directly. With interfaces, you can define an \`ICustomerValidator\` interface with a \`Validate(Customer: Record Customer)\` method. You create different validator codeunits (e.g., \`StandardCustomerValidator\`, \`KeyAccountValidator\`), all implementing this interface. Your core logic then simply depends on \`ICustomerValidator\` and receives the *correct* implementation at runtime.

Other prime examples:
* **Pluggable Integrations:** An \`IPaymentGateway\` interface with methods like \`ProcessPayment\`, \`RefundPayment\`. Implementations for different providers (\`StripePaymentGateway\`, \`PayPalPaymentGateway\`). Your Sales Order code just uses the interface.
* **Flexible Calculations:** An \`ITaxCalculator\` interface. Implementations for different tax jurisdictions or complex tax rules.
* **Different Workflow Actions:** An \`IWorkflowAction\` interface for pluggable steps in a custom workflow.

## Designing Effective Interfaces

Not all interfaces are created equal. To get the most benefit, follow these guidelines:

* **Keep them Small and Focused:** Don't create giant interfaces with dozens of methods. Group related functionality into smaller, role-specific interfaces (ISP!). An interface for "Customer Address Validation" is better than adding address methods to a general "Customer Processing" interface.
* **Define the "What," Not the "How":** Interface methods should describe the action or data retrieval, not expose implementation details.
* **Use Intent-Revealing Names:** Interface names typically start with 'I' (e.g., \`ICustomerValidator\`) and their methods should clearly state their purpose (\`Validate\`, \`ProcessPayment\`).

## Using Interface Variables and Dependency Injection (AL Style)

Once you have interfaces, you need a way for your code to get an instance of the *correct* concrete codeunit that implements the interface. This is where Dependency Injection comes in. While AL doesn't have a built-in DI container like some languages, you can implement a simple form:

Have a central place (e.g., a dedicated codeunit or a setup record) that knows which concrete codeunit implements which interface for the current context. Your code that *needs* the implementation calls this central place to *get* the correct codeunit instance via the interface variable.

// Example of a Simple Interface
interface IMyInterface
{
    /// <summary>
    /// Performs a specific action based on input value.
    /// </summary>
    /// <param name="InputValue">The value to process.</param>
    /// <returns>A result string based on the processing.</returns>
    procedure PerformAction(InputValue: Text): Text;
}

// Example Implementation 1
codeunit 50100 "My Interface Impl A" implements IMyInterface
{
    procedure PerformAction(InputValue: Text): Text
    begin
        exit('Impl A processed: ' + InputValue);
    end;
}

// Example Implementation 2
codeunit 50101 "My Interface Impl B" implements IMyInterface
{
    procedure PerformAction(InputValue: Text): Text
    begin
        exit('Impl B handled: ' + InputValue + ' differently!');
    end;
}

// Codeunit that needs to use the interface (Consumer)
codeunit 50102 "My Codeunit Consumer"
{
    // Method to get the correct implementation (simple Dependency Injection)
    local procedure GetMyInterface(Config: Text): interface IMyInterface
    var
        ImplA: Codeunit "My Interface Impl A";
        ImplB: Codeunit "My Interface Impl B";
    begin
        if Config = 'A' then
            exit(ImplA)
        else if Config = 'B' then
            exit(ImplB)
        else
            error('Invalid configuration %1', Config); // Or use a default
    end;

    // Method that uses the interface without knowing the concrete implementation
    procedure RunAction(Input: Text; Config: Text)
    var
        MyProcessor: interface IMyInterface;
        Result: Text;
    begin
        MyProcessor := GetMyInterface(Config); // Get the implementation via the interface

        Result := MyProcessor.PerformAction(Input); // Use the interface variable

        Message('Action Result: %1', Result);
    end;
}

In this pattern, \`MyCodeunit\` doesn't care if it's using \`ImplementationA\` or \`ImplementationB\`, as long as it gets *an* object that fulfills the \`MyInterface\` contract. The knowledge of *which* implementation to use is externalized.

## Interfaces and Testability: The Developer's Delight

This is where interface thinking truly pays off for developers. When your code depends on an interface, you can easily create a "mock" or "fake" implementation of that interface specifically for your automated tests.

A mock implementation doesn't perform the real logic (like calling an external API or complex calculations). It's a simple codeunit that implements the interface but whose methods return predefined values or simply record that they were called.

// Example Mock Implementation for Testing
codeunit 50103 "My Interface Mock A" implements IMyInterface
{
    LastInputReceived: Text;
    CallCount: Integer;

    procedure PerformAction(InputValue: Text): Text
    begin
        // Don't do the real logic, just record the call and return a predictable value
        LastInputReceived := InputValue;
        CallCount += 1;
        exit('Mocked Result for: ' + InputValue); // Return a fixed/predictable result for the test
    end;

    // Helper method for tests to inspect what happened
    procedure GetLastInputReceived(): Text
    begin
        exit(LastInputReceived);
    end;

    procedure GetCallCount(): Integer
    begin
        exit(CallCount);
    end;
}

// Example Test Codeunit Using the Mock
codeunit 132000 "My Codeunit Consumer Test"
{
    Subtype := Test;

    [Test]
    procedure TestRunActionWithMockA()
    var
        MyConsumer: Codeunit "My Codeunit Consumer";
        MockA: Codeunit "My Interface Mock A";
        InputText: Text;
        ExpectedResult: Text;
    begin
        // [SCENARIO] Run RunAction method using Mock A
        // [GIVEN] Input text and mock implementation
        InputText := 'TestData123';
        ExpectedResult := 'Mocked Result for: TestData123';

        // Simple AL "Dependency Injection" for testing:
        // Instead of getting the real implementation, assign the mock to the interface variable
        // NOTE: This simple assignment only works if My Codeunit Consumer has a way
        // to receive the interface implementation from the outside, e.g., via a parameter
        // or a dedicated 'SetProcessor' method. The previous example was simplified.
        // A more testable design would pass the IMyInterface variable INTO RunAction.

        // Let's assume MyCodeunitConsumer had a method like:
        // procedure RunAction(Input: Text; MyProcessor: interface IMyInterface)
        // Then the test would be:
        // MyConsumer.RunAction(InputText, MockA); // Pass the mock directly

        // Without refactoring MyCodeunitConsumer, testing is harder.
        // This highlights *why* designing for interfaces aids testability.

        // If MyCodeunitConsumer had a method to *get* the processor that *could be overriden by a test*, even better.
        // Example Test Helper (Conceptual):
        // Codeunit 50104 "Processor Resolver"
        // [Normal] procedure GetMyInterface(Config: Text): interface IMyInterface; ... uses real impls ...
        // [IntegrationEvent] OnGetMyInterface(Config, var ProcessorInterface); // Test subscribes here to return mock

        // Let's assume for this example you have a way to inject the mock.
        // Example check (assuming MockA was successfully used internally)
        // This part depends heavily on how MyCodeunitConsumer is designed to *get* its interface implementation.
        // But the principle is: the test interacts with the MOCK object to verify correct behavior.

        // For demonstration, let's just show interacting with the mock itself after a hypothetical call
        // that used it internally:
        // MyConsumer.RunAction(InputText, 'A'); // If MyConsumer had a way to be told to use MockA when 'A' is requested in a test...
        // Codeunit "Test Management".SetFilterForTestCodeunits(Codeunit::"My Interface Mock A"); // A way to ensure the test version is used? (Conceptual)

        // A better, more direct test pattern using a refactored consumer:
        var
            TestConsumer: Codeunit "My Refactored Testable Consumer"; // Needs to be refactored
            MockProcessor: Codeunit "My Interface Mock A";
            ActualResult: Text;
        begin
            // Assuming TestConsumer.RunAction(Input: Text; Processor: Interface IMyInterface) exists
            // ActualResult := TestConsumer.RunAction(InputText, MockProcessor);

            // Verify the mock received the correct input
            Assert.AreEqual(InputText, MockProcessor.GetLastInputReceived(), 'Mock did not receive expected input.');

            // Verify the mock's method was called
            Assert.AreEqual(1, MockProcessor.GetCallCount(), 'Mock PerformAction was not called exactly once.');

            // If TestConsumer returned the result:
            // Assert.AreEqual(ExpectedResult, ActualResult, 'Consumer did not get expected result from mock.');
        end; // This test structure shows the *benefit* of designing for testability via interfaces.
    end;
}

**The Secret:** By depending on interfaces, you can isolate the code unit you are testing from its dependencies. You provide mock objects via dependency injection (even the simple AL style) during testing, allowing you to test the logic *within* that codeunit without needing a live external service, a full database setup, or complex interconnected data. This leads to faster, more reliable, and truly isolated unit tests.

## Conclusion: Building Resilient Extensions with Interface Thinking

Interfaces in AL are more than just syntax; they are a powerful design tool. By embracing interface thinking, you move away from rigid, tightly coupled code towards flexible, modular extensions. This makes your code easier to read, understand, maintain, and significantly easier to test automatically.

While it requires a shift in how you structure your AL code and manage dependencies, the long-term benefits in terms of code quality, reduced maintenance effort, and resilience to change (both in the base app and your own logic variations) are immense.

Start looking for opportunities to introduce interfaces. Where do you have \`CASE\` statements based on types? Where do you call specific integration codeunits directly? These are prime candidates for abstraction via interfaces.

What are your thoughts on using interfaces in AL? Have you found them beneficial in your projects? Share your experiences below!

---`,Ba=`# Pensamento de Interface em AL: Desenhar para o Futuro das Suas Extensões BC

Interfaces. Chegaram discretamente ao AL, uma nova palavra-chave na nossa linguagem. Para muitos, podem parecer apenas mais uma funcionalidade de sintaxe, talvez usada ocasionalmente ao seguir um padrão específico mostrado na documentação.

Mas estou aqui para vos dizer que adotar uma *mentalidade de 'interface-first'* é uma mudança fundamental que pode elevar as vossas extensões do Business Central de código funcional para aplicações verdadeiramente robustas, fáceis de manter e flexíveis, concebidas para durar. Não se trata apenas de usar a sintaxe; trata-se de *pensar* de forma diferente sobre a estrutura e as dependências do vosso código.

Pensem nisto: com que frequência têm codeunits que estão fortemente acopladas a outras codeunits concretas? Se precisarem de trocar a lógica, adicionar uma nova variação de um processo, ou escrever testes automatizados para uma peça específica de lógica de negócio, muitas vezes encontram-se enredados numa teia de dependências. É aqui que as interfaces brilham. Elas permitem definir um *contrato* – o que um pedaço de código *faz* – sem especificar *como* o faz.

Vamos explorar porque abraçar o pensamento de interface é crucial para o desenvolvimento moderno em BC e como desbloqueia padrões que tornam as vossas extensões mais fáceis de testar, manter e evoluir.

## Porquê Interfaces? A Conexão com os Princípios SOLID

As interfaces são um facilitador direto de princípios chave de design de software, mais notavelmente do acrónimo SOLID:

* **Princípio da Inversão de Dependência (DIP):** Módulos de alto nível não devem depender de módulos de baixo nível. Ambos devem depender de abstrações (interfaces). As abstrações não devem depender de detalhes. Os detalhes devem depender de abstrações. Isto é fundamental para o desacoplamento.
* **Princípio da Segregação de Interface (ISP):** Clientes não devem ser forçados a depender de interfaces que não utilizam. É melhor ter muitas interfaces pequenas e específicas de função do que uma grande e monolítica.

Ao depender de interfaces em vez de implementações concretas, o vosso código torna-se significativamente menos acoplado. Uma codeunit que precisa de executar uma determinada ação depende apenas de uma interface que define essa ação, não da codeunit específica que atualmente a implementa.

## Cenários Reais para o Poder das Interfaces

Onde podem aplicar isto? Praticamente em qualquer lugar onde tenham variações na lógica ou precisem de integrar com sistemas externos.

Imaginem precisar de regras de validação diferentes para diferentes tipos de clientes ou documentos. Sem interfaces, poderiam ter um grande bloco \`IF/ELSEIF\` ou uma declaração \`CASE\` complexa a verificar tipos e a chamar diretamente codeunits de validação específicas. Com interfaces, podem definir uma interface \`ICustomerValidator\` com um método \`Validate(Customer: Record Customer)\`. Criam diferentes codeunits de validação (por exemplo, \`StandardCustomerValidator\`, \`KeyAccountValidator\`), todas implementando esta interface. A vossa lógica central então simplesmente depende de \`ICustomerValidator\` e recebe a implementação *correta* em tempo de execução.

Outros exemplos principais:
* **Integrações Plugáveis:** Uma interface \`IPaymentGateway\` com métodos como \`ProcessPayment\`, \`RefundPayment\`. Implementações para diferentes fornecedores (\`StripePaymentGateway\`, \`PayPalPaymentGateway\`). O vosso código de Encomenda de Venda apenas usa a interface.
* **Cálculos Flexíveis:** Uma interface \`ITaxCalculator\`. Implementações para diferentes jurisdições fiscais ou regras fiscais complexas.
* **Ações de Workflow Diferentes:** Uma interface \`IWorkflowAction\` para passos plugáveis num workflow personalizado.

## Desenhar Interfaces Eficazes

Nem todas as interfaces são criadas iguais. Para obter o máximo benefício, sigam estas diretrizes:

* **Mantenham-nas Pequenas e Focadas:** Não criem interfaces gigantes com dezenas de métodos. Agrupem funcionalidades relacionadas em interfaces menores e específicas de função (ISP!). Uma interface para "Validação de Endereço de Cliente" é melhor do que adicionar métodos de endereço a uma interface geral de "Processamento de Cliente".
* **Definam o "Quê", Não o "Como":** Os métodos de interface devem descrever a ação ou a recuperação de dados, não expor detalhes de implementação.
* **Usem Nomes Que Revelem a Intenção:** Nomes de interfaces tipicamente começam com 'I' (por exemplo, \`ICustomerValidator\`) e os seus métodos devem indicar claramente o seu propósito (\`Validate\`, \`ProcessPayment\`).

## Usar Variáveis de Interface e Injeção de Dependência (Estilo AL)

Uma vez que tenham interfaces, precisam de uma forma para que o vosso código obtenha uma instância da codeunit concreta *correta* que implementa a interface. É aqui que entra a Injeção de Dependência. Embora o AL não tenha um contentor de DI integrado como algumas linguagens, podem implementar uma forma simples:

Tenham um local central (por exemplo, uma codeunit dedicada ou um registo de configuração) que saiba qual codeunit concreta implementa qual interface para o contexto atual. O vosso código que *precisa* da implementação chama este local central para *obter* a instância correta da codeunit através da variável de interface.

// Exemplo de uma Interface Simples
interface IMyInterface
{
    /// <summary>
    /// Realiza uma ação específica com base no valor de entrada.
    /// </summary>
    /// <param name="InputValue">O valor a processar.</param>
    /// <returns>Uma string resultante baseada no processamento.</returns>
    procedure PerformAction(InputValue: Text): Text;
}

// Exemplo de Implementação 1
codeunit 50100 "My Interface Impl A" implements IMyInterface
{
    procedure PerformAction(InputValue: Text): Text
    begin
        exit('Impl A processou: ' + InputValue);
    end;
}

// Exemplo de Implementação 2
codeunit 50101 "My Interface Impl B" implements IMyInterface
{
    procedure PerformAction(InputValue: Text): Text
    begin
        exit('Impl B tratou: ' + InputValue + ' de forma diferente!');
    end;
}

// Codeunit que precisa usar a interface (Consumidora)
codeunit 50102 "My Codeunit Consumer"
{
    // Método para obter a implementação correta (Injeção de Dependência simples)
    local procedure GetMyInterface(Config: Text): interface IMyInterface
    var
        ImplA: Codeunit "My Interface Impl A";
        ImplB: Codeunit "My Interface Impl B";
    begin
        if Config = 'A' then
            exit(ImplA)
        else if Config = 'B' then
            exit(ImplB)
        else
            error('Configuração inválida %1', Config); // Ou usar um padrão
    end;

    // Método que usa a interface sem saber a implementação concreta
    procedure RunAction(Input: Text; Config: Text)
    var
        MyProcessor: interface IMyInterface;
        Result: Text;
    begin
        MyProcessor := GetMyInterface(Config); // Obter a implementação via a interface

        Result := MyProcessor.PerformAction(Input); // Usar a variável de interface

        Message('Resultado da Ação: %1', Result);
    end;
}

Neste padrão, a \`MyCodeunit\` não se importa se está a usar a \`ImplementationA\` ou a \`ImplementationB\`, desde que obtenha *um* objeto que cumpra o contrato da \`MyInterface\`. O conhecimento de *qual* implementação usar é externalizado.

## Interfaces e Testabilidade: O Deleite do Developer

É aqui que o pensamento de interface realmente compensa para os developers. Quando o vosso código depende de uma interface, podem facilmente criar uma implementação "mock" ou "fake" dessa interface especificamente para os vossos testes automatizados.

Uma implementação mock não realiza a lógica real (como chamar uma API externa ou cálculos complexos complexos). É uma codeunit simples que implementa a interface, mas cujos métodos devolvem valores predefinidos ou simplesmente registam que foram chamados.

// Exemplo de Implementação Mock para Teste
codeunit 50103 "My Interface Mock A" implements IMyInterface
{
    LastInputReceived: Text;
    CallCount: Integer;

    procedure PerformAction(InputValue: Text): Text
    begin
        // Não fazer a lógica real, apenas registar a chamada e devolver um valor previsível
        LastInputReceived := InputValue;
        CallCount += 1;
        exit('Resultado Mock para: ' + InputValue); // Devolver um resultado fixo/previsível para o teste
    end;

    // Método auxiliar para os testes inspecionarem o que aconteceu
    procedure GetLastInputReceived(): Text
    begin
        exit(LastInputReceived);
    end;

    procedure GetCallCount(): Integer
    begin
        exit(CallCount);
    end;
}

// Exemplo de Codeunit de Teste Usando o Mock
codeunit 132000 "My Codeunit Consumer Test"
{
    Subtype := Test;

    [Test]
    procedure TestRunActionWithMockA()
    var
        MyConsumer: Codeunit "My Codeunit Consumer";
        MockA: Codeunit "My Interface Mock A";
        InputText: Text;
        ExpectedResult: Text;
    begin
        // [CENÁRIO] Executar o método RunAction usando o Mock A
        // [DADO] Texto de entrada e implementação mock
        InputText := 'TestData123';
        ExpectedResult := 'Resultado Mock para: TestData123';

        // Injeção de Dependência AL simples para teste:
        // Em vez de obter a implementação real, atribuir o mock à variável de interface
        // NOTA: Esta atribuição simples só funciona se a Codeunit My Codeunit Consumer tiver uma forma
        // de receber a implementação da interface de fora, por exemplo, através de um parâmetro
        // ou de um método dedicado 'SetProcessor'. O exemplo anterior foi simplificado.
        // Um design mais testável passaria a variável IMyInterface PARA RunAction.

        // Vamos assumir que MyCodeunitConsumer tinha um método como:
        // procedure RunAction(Input: Text; MyProcessor: interface IMyInterface)
        // Então o teste seria:
        // MyConsumer.RunAction(InputText, MockA); // Passar o mock diretamente

        // Sem refatorar MyCodeunitConsumer, testar é mais difícil.
        // Isto realça *porque* desenhar para interfaces ajuda na testabilidade.

        // Se MyCodeunitConsumer tivesse um método para *obter* o processador que *pudesse ser substituído por um teste*, ainda melhor.
        // Exemplo de Helper de Teste (Conceptual):
        // Codeunit 50104 "Processor Resolver"
        // [Normal] procedure GetMyInterface(Config: Text): interface IMyInterface; ... usa impls reais ...
        // [IntegrationEvent] OnGetMyInterface(Config, var ProcessorInterface); // Teste subscreve aqui para devolver o mock

        // Vamos assumir, para este exemplo, que têm uma forma de injetar o mock.
        // Exemplo de verificação (assumindo que MockA foi usado internamente com sucesso)
        // Esta parte depende muito de como MyCodeunitConsumer é desenhado para *obter* a sua implementação da interface.
        // Mas o princípio é: o teste interage com o objeto MOCK para verificar o comportamento correto.

        // Para demonstração, vamos apenas mostrar a interação com o próprio mock após uma chamada hipotética
        // que o usou internamente:
        // MyConsumer.RunAction(InputText, 'A'); // Se MyConsumer tivesse uma forma de ser instruído a usar MockA quando 'A' é solicitado num teste...
        // Codeunit "Test Management".SetFilterForTestCodeunits(Codeunit::"My Interface Mock A"); // Uma forma de garantir que a versão de teste é usada? (Conceptual)

        // Um padrão de teste melhor e mais direto usando um consumer refatorado:
        var
            TestConsumer: Codeunit "My Refactored Testable Consumer"; // Precisa ser refatorado
            MockProcessor: Codeunit "My Interface Mock A";
            ActualResult: Text;
        begin
            // Assumindo que TestConsumer.RunAction(Input: Text; Processor: Interface IMyInterface) existe
            // ActualResult := TestConsumer.RunAction(InputText, MockProcessor);

            // Verificar se o mock recebeu a entrada correta
            Assert.AreEqual(InputText, MockProcessor.GetLastInputReceived(), 'Mock não recebeu a entrada esperada.');

            // Verificar se o método do mock foi chamado
            Assert.AreEqual(1, MockProcessor.GetCallCount(), 'Mock PerformAction não foi chamado exatamente uma vez.');

            // Se TestConsumer devolveu o resultado:
            // Assert.AreEqual(ExpectedResult, ActualResult, 'Consumer não obteve o resultado esperado do mock.');
        end; // Esta estrutura de teste mostra o *benefício* de desenhar para testabilidade via interfaces.
    end;
}

**O Segredo:** Ao depender de interfaces, podem isolar a codeunit que estão a testar das suas dependências. Fornecem objetos mock através de injeção de dependência (mesmo o estilo AL simples) durante os testes, permitindo testar a lógica *dentro* dessa codeunit sem precisar de um serviço externo ativo, uma configuração completa da base de dados, ou dados interconectados complexos. Isto leva a testes unitários mais rápidos, fiáveis e verdadeiramente isolados.

## Conclusão: Construir Extensões Resilientes com Pensamento de Interface

Interfaces em AL são mais do que apenas sintaxe; são uma ferramenta poderosa de design. Ao abraçar o pensamento de interface, afastam-se de código rígido e fortemente acoplado para extensões flexíveis e modulares. Isto torna o vosso código mais fácil de ler, compreender, manter e significativamente mais fácil de testar automaticamente.

Embora exija uma mudança na forma como estruturam o vosso código AL e gerem dependências, os benefícios a longo prazo em termos de qualidade de código, redução do esforço de manutenção e resiliência à mudança (tanto na base app como nas vossas próprias variações lógicas) são imensos.

Comecem a procurar oportunidades para introduzir interfaces. Onde têm declarações \`CASE\` baseadas em tipos? Onde chamam diretamente codeunits de integração específicas? Estes são candidatos ideais para abstração via interfaces.

Quais são as vossas opiniões sobre o uso de interfaces em AL? Têm achado benéfico nos vossos projetos? Partilhem as vossas experiências abaixo!

---`,_a=`# Beyond the FIND('-'): Unmasking Hidden Performance Killers in Your AL Queries

Ah, the familiar scenario. You've written a piece of AL code. It loops through records, performs calculations, maybe updates some fields. On your development environment, with its pristine, small dataset, it flies. Fast, responsive, a thing of beauty.

Then, you deploy it to production. Suddenly, users are complaining. Processes that took seconds now crawl for minutes. The finger-pointing begins: "Is it the server? Is it the network? Is it... my code?"

Many developers immediately jump to the usual suspects: missing database indexes. And yes, often, adding a key can dramatically improve performance. But what happens when the indexes are all in place, the database feels healthy, and yet, that specific AL block is still a sloth?

This, my friends, is where we peel back the layers. The Business Central service tier and the underlying SQL Server database are engaged in a constant, complex conversation initiated by your AL code. Understanding the *nuances* of this conversation is key to writing truly performant applications. Let's talk about some less obvious ways your AL code might be inadvertently sabotaging performance.

## The Silent Cost of Implicit Joins

You know that you define relationships between tables. But are you aware of how easily AL can trigger implicit joins that are incredibly costly?

Consider this seemingly innocent snippet:

Customer.SETFILTER("No.", 'C00001');
IF Customer.FINDFIRST THEN BEGIN
    // Access a field from the related Salesperson table
    SalespersonCode := Customer."Salesperson Code";

    // Now, let's filter something based on the Salesperson Name
    Salesperson.SETRANGE(Code, SalespersonCode);
    IF Salesperson.FINDFIRST THEN BEGIN
        SalespersonName := Salesperson.Name;
        // Now let's filter Sales Orders by Salesperson Name! (Bad Idea Ahead!)
        SalesHeader.SETRANGE("Document Type", SalesHeader."Document Type"::Order);
        SalesHeader.SETRANGE("Salesperson Code", SalespersonCode); // This is okay

        // BUT what if you filtered Sales Orders based on the Name field from the Salesperson *variable*?
        // SalesHeader.SETRANGE("Salesperson Name Field on SalesHeader", SalespersonName); // If such a direct field existed & was based on name

        // A more realistic example of an *implicit* cost:
        // Looping through customers and checking a FlowField that relies on Sales Orders
        Customer.SETRANGE(...);
        IF Customer.FINDSET THEN BEGIN
            REPEAT
                // Accessing a FlowField that aggregates Sales Order amounts per customer
                TotalSales := Customer."Total Sales (LCY)"; // This FlowField needs to query the Sales Header table
                // This access *inside a loop* can trigger a separate query for *each* customer record!
            UNTIL Customer.NEXT = 0;
            // FIX: Calculate FlowFields BEFORE the loop or redesign
        END;
    END;
END;

The danger lies not just in your explicit \`FINDSET\` or \`FINDFIRST\` calls. Accessing related table fields *within a loop* or relying heavily on FlowFields/FlowDimensions inside iteration can cause the service tier to generate a separate SQL query *for every single record* being processed in the outer loop. This turns one intended query into hundreds or thousands of mini-queries, each with its own overhead, crushing performance.

**The Secret:** Be acutely aware of *what data you are accessing* inside loops. If you need data from related tables or FlowFields, consider alternative strategies:
1.  Denormalize data where appropriate (with caution and purpose).
2.  Pre-aggregate data into a temporary table before looping.
3.  Refactor the logic to perform bulk operations or use temporary records to filter/calculate data outside the main loop.
4.  Use \`SETLOADFIELDS\` religiously! More on that next.

## \`SETLOADFIELDS\`: The Most Underused Performance Button

You're likely familiar with \`SETLOADFIELDS\`. It tells Business Central *exactly* which non-key fields you intend to read when you retrieve a record. The common advice is to use it when you only need a few fields from a wide table. Good advice!

But here's the deeper truth: **If you do NOT use \`SETLOADFIELDS\`, the system *might* decide to load *all* non-BLOB fields.** This is often the case when you access a field *after* the \`FIND\` call. While the service tier is smart, relying on its guessing game is dangerous.

Consider a table with 100 fields. You need 2. Without \`SETLOADFIELDS\`, you might pull 98 unnecessary fields across the network and into memory for *every single record* in your \`FINDSET\`. This is pure waste.

// Bad: Potentially loads ALL non-BLOB fields
Customer.SETFILTER(...);
IF Customer.FINDSET THEN BEGIN
    REPEAT
        CustName := Customer.Name; // Accessing a field after FINDSET - AL might have loaded everything
        CustAddress := Customer.Address; // Another field
        // ... do stuff ...
    UNTIL Customer.NEXT = 0;
END;

// Good: Explicitly tells the system what to load
Customer.SETFILTER(...);
Customer.SETLOADFIELDS(Name, Address); // Tell BC exactly what you need!
IF Customer.FINDSET THEN BEGIN
    REPEAT
        CustName := Customer.Name; // These fields are now loaded efficiently
        CustAddress := Customer.Address;
        // ... do stuff ...
    UNTIL Customer.NEXT = 0;
END;

**The Secret:** Make using \`SETLOADFIELDS\` a habit for *any* \`FINDSET\` or \`FINDFIRST\` where you don't need every single field. It's not just for wide tables; it's for *efficient data retrieval* in any scenario. It explicitly tells the SQL query which columns to select, reducing data transfer and memory pressure significantly, especially in loops.

## Sequential Scans vs. Index Seeks: The Query Optimizer's Mood Swings

Indexes are great, but the SQL Server Query Optimizer isn't a robot blindly following orders. It tries to find the *cheapest* way to get the data. Sometimes, your AL code, or specifically the way you filter (\`SETFILTER\`, \`SETRANGE\`), can make an index unusable or convince the optimizer that a full table scan is actually *faster* than using an index.

This often boils down to **SARGability** (Search Argumentability). A filter is SARGable if SQL Server can use an index efficiently to apply it.

Examples of things that can hurt SARGability from an AL perspective (and often lead to table scans):
* Filtering on functions applied to fields (e.g., \`SETFILTER(Description, '@*term*')\` might prevent index usage on \`Description\` unless a full-text index is in place and the syntax is correct).
* Using negations in complex ways (e.g., \`SETFILTER("No.", '<>C00001'\`) is usually fine, but combinations can confuse the optimizer).
* Complex expressions in filters that aren't simple comparisons.

While AL abstracts the SQL, understanding that certain filter patterns prevent effective index usage is critical. You need to structure your \`SETRANGE\` and \`SETFILTER\` calls to be as index-friendly as possible.

**The Secret:** When facing performance issues on filtered reads, suspect the *nature* of the filter itself. Simplify filters where possible, avoid applying functions in the filter criteria if you can filter on the raw field value instead, and test filter combinations. The AL Profiler or examining SQL traces (if you have access in on-prem or sandbox environments) can confirm if an index is being ignored and a scan is occurring.

## Locking Woes: When Your Code Blocks Everyone Else

Performance isn't just about how fast *your* code runs; it's about how your code impacts the *entire system*. Poor transaction management and locking can bring a busy system to its knees.

Every time your code reads or writes data, it acquires locks. If you hold locks for too long, or request incompatible locks on data someone else is using, you create *blocking*. Users see the spinning wheel, and processes time out.

Common AL patterns that lead to locking issues:
* Performing long-running business logic *between* a \`FIND\` and a \`MODIFY\`/\`INSERT\`/\`DELETE\`. You hold locks on the records while doing unrelated work.
* Looping through many records and performing \`MODIFY\`/\`INSERT\` inside the loop without considering transaction scope. Each write acquires and holds locks.
* Using \`COMMIT\` within a long-running process loop. This releases locks for the *committed* batch but might not be the optimal transaction boundary and can lead to partial updates if later steps fail.
* Not understanding the difference between read locks (shared, allowing others to read) and write locks (exclusive, blocking others). \`LOCKTABLE\` should be used judiciously and with understanding.

**The Secret:** Design your processes to minimize the time locks are held. Perform calculations and validations *before* you start writing data. When modifying many records, consider breaking the process into smaller, transactionally safe batches if possible. Understand the impact of \`COMMIT\` and avoid scattering them haphazardly. For critical updates on single records, consider \`LOCKTABLE\` carefully, but be aware it can cause contention.

## The AL Profiler: Your Best Friend in the Performance Battle

I mentioned it before, but it deserves its own point. The AL Profiler in VS Code is an indispensable tool, and many developers only use its most basic features.

Go beyond just seeing which function took the longest. Analyze the *call tree* to understand the sequence of operations. Look at the "Database Totals" and "Service Totals" – these numbers tell you how much time was spent waiting for the database vs. executing AL code. High database time often points to inefficient queries or locking issues. High service time might indicate CPU-bound AL logic or excessive calls back and forth to the service tier.

**The Secret:** Learn to interpret the Profiler output deeply. It's not just about finding the slowest line; it's about understanding the *pattern* of execution and the interaction with the underlying data store. Correlate the timings with the AL patterns we discussed. See excessive database calls within a loop? That's likely your implicit join/FlowField issue. See high wait times? That could be locking.

## Conclusion: Becoming a Performance Savant

Writing performant AL code isn't just about knowing syntax; it's about understanding the machine beneath. By looking beyond the basic \`FIND\` operations and considering the implications of implicit joins, the necessity of \`SETLOADFIELDS\`, the subtleties of filter SARGability, and the impact of locking, you move from being a developer who writes code that *works* to a developer who writes code that *performs*.

These are just a few areas where performance can unexpectedly tank. There are others – complex report data item relationships, inefficient XMLports, overuse of temporary tables without proper keys, and more. But mastering the interaction with the database layer via intelligent query patterns and transaction management is fundamental.

So, next time your code is running slow, take a deep breath. Check the simple stuff, yes, but then start thinking like the service tier and the SQL Optimizer. Where could implicit actions or inefficient data retrieval be happening?

What are your most frustrating performance war stories in Business Central? Share them in the comments below! Let's learn from each other.

---`,ja=`# Para Lá do FIND('-'): A Desmascarar Assassinos de Desempenho Ocultos nas Suas Queries AL

Ah, o cenário familiar. Escreveu um pedaço de código AL. Percorre registos, realiza cálculos, talvez atualiza alguns campos. No seu ambiente de desenvolvimento, com a sua base de dados pequena e imaculada, voa. Rápido, responsivo, uma beleza.

Depois, implementa-o em produção. De repente, os utilizadores começam a queixar-se. Processos que demoravam segundos agora arrastam-se por minutos. O jogo da culpa começa: "Será do servidor? Será da rede? Será... o meu código?"

Muitos developers saltam imediatamente para os suspeitos do costume: índices de base de dados em falta. E sim, muitas vezes, adicionar uma chave pode melhorar drasticamente o desempenho. Mas o que acontece quando todos os índices estão no lugar, a base de dados parece saudável e, no entanto, esse bloco AL específico ainda é uma lesma?

É aqui, meus amigos, que descascamos as camadas. A camada de serviço do Business Central e a base de dados subjacente do SQL Server estão envolvidas numa conversa constante e complexa iniciada pelo seu código AL. Compreender as *nuances* desta conversa é fundamental para escrever aplicações verdadeiramente performáticas. Vamos falar sobre algumas formas menos óbvias de o seu código AL poder estar a sabotar inadvertidamente o desempenho.

## O Custo Silencioso das Junções Implícitas

Sabe que define relações entre tabelas. Mas está ciente da facilidade com que o AL pode desencadear junções implícitas que são incrivelmente dispendiosas?

Considere este snippet aparentemente inocente:

Customer.SETFILTER("No.", 'C00001');
IF Customer.FINDFIRST THEN BEGIN
    // Aceder a um campo da tabela Salesperson relacionada
    SalespersonCode := Customer."Salesperson Code";

    // Agora, vamos filtrar algo com base no nome do Salesperson
    Salesperson.SETRANGE(Code, SalespersonCode);
    IF Salesperson.FINDFIRST THEN BEGIN
        SalespersonName := Salesperson.Name;
        // Agora vamos filtrar Encomendas de Venda pelo nome do Salesperson! (Má Ideia à Frente!)
        SalesHeader.SETRANGE("Document Type", SalesHeader."Document Type"::Order);
        SalesHeader.SETRANGE("Salesperson Code", SalespersonCode); // Isto está ok

        // MAS e se filtrar Encomendas de Venda com base no campo Nome da *variável* Salesperson?
        // SalesHeader.SETRANGE("Campo Nome Salesperson em SalesHeader", SalespersonName); // Se tal campo direto existisse e fosse baseado no nome

        // Um exemplo mais realista de custo *implícito*:
        // Percorrer clientes e verificar um FlowField que depende de Encomendas de Venda
        Customer.SETRANGE(...);
        IF Customer.FINDSET THEN BEGIN
            REPEAT
                // Aceder a um FlowField que agrega montantes de Encomendas de Venda por cliente
                TotalSales := Customer."Total Sales (LCY)"; // Este FlowField precisa de consultar a tabela Sales Header
                // Este acesso *dentro de um loop* pode desencadear uma query separada para *cada* registo de cliente!
            UNTIL Customer.NEXT = 0;
            // CORREÇÃO: Calcular FlowFields ANTES do loop ou redesenhar
        END;
    END;
END;

O perigo não reside apenas nas suas chamadas explícitas \`FINDSET\` ou \`FINDFIRST\`. Aceder a campos de tabelas relacionadas *dentro de um loop* ou depender fortemente de FlowFields/FlowDimensions dentro de iterações pode fazer com que a camada de serviço gere uma query SQL separada *para cada registo* a ser processado no loop exterior. Isto transforma uma query pretendida em centenas ou milhares de mini-queries, cada uma com a sua própria sobrecarga, esmagando o desempenho.

**O Segredo:** Esteja extremamente ciente de *quais dados está a aceder* dentro de loops. Se precisar de dados de tabelas relacionadas ou FlowFields, considere estratégias alternativas:
1.  Desnormalizar dados onde apropriado (com cuidado e propósito).
2.  Pré-agregar dados numa tabela temporária antes de iterar.
3.  Refatorar a lógica para realizar operações em massa ou usar registos temporários para filtrar/calcular dados fora do loop principal.
4.  Usar \`SETLOADFIELDS\` religiosamente! Mais sobre isso a seguir.

## \`SETLOADFIELDS\`: O Botão de Desempenho Mais Subutilizado

Provavelmente está familiarizado com o \`SETLOADFIELDS\`. Ele diz ao Business Central *exatamente* quais campos não chave pretende ler quando recupera um registo. O conselho comum é usá-lo quando só precisa de alguns campos de uma tabela larga. Bom conselho!

Mas aqui está a verdade mais profunda: **Se NÃO usar \`SETLOADFIELDS\`, o sistema *pode* decidir carregar *todos* os campos não-BLOB.** Este é frequentemente o caso quando acede a um campo *após* a chamada \`FIND\`. Embora a camada de serviço seja inteligente, depender do seu palpite é perigoso.

Considere uma tabela com 100 campos. Você precisa de 2. Sem \`SETLOADFIELDS\`, pode estar a puxar 98 campos desnecessários através da rede e para a memória para *cada registo* no seu \`FINDSET\`. Isto é puro desperdício.

// Mau: Potencialmente carrega TODOS os campos não-BLOB
Customer.SETFILTER(...);
IF Customer.FINDSET THEN BEGIN
    REPEAT
        CustName := Customer.Name; // Aceder a um campo após FINDSET - AL pode ter carregado tudo
        CustAddress := Customer.Address; // Outro campo
        // ... fazer coisas ...
    UNTIL Customer.NEXT = 0;
END;

// Bom: Diz explicitamente ao sistema o que carregar
Customer.SETFILTER(...);
Customer.SETLOADFIELDS(Name, Address); // Diga ao BC exatamente o que precisa!
IF Customer.FINDSET THEN BEGIN
    REPEAT
        CustName := Customer.Name; // Estes campos são agora carregados eficientemente
        CustAddress := Customer.Address;
        // ... fazer coisas ...
    UNTIL Customer.NEXT = 0;
END;

**O Segredo:** Torne o uso de \`SETLOADFIELDS\` um hábito para *qualquer* \`FINDSET\` ou \`FINDFIRST\` onde não precisa de todos os campos. Não é apenas para tabelas largas; é para *recuperação eficiente de dados* em qualquer cenário. Ele diz explicitamente à query SQL quais colunas selecionar, reduzindo significativamente a transferência de dados e a pressão de memória, especialmente em loops.

## Scans Sequenciais vs. Index Seeks: As Mudanças de Humor do Query Optimizer

Os índices são ótimos, mas o Query Optimizer do SQL Server não é um robô a seguir ordens cegamente. Ele tenta encontrar a forma *mais barata* de obter os dados. Às vezes, o seu código AL, ou especificamente a forma como filtra (\`SETFILTER\`, \`SETRANGE\`), pode tornar um índice inutilizável ou convencer o otimizador de que um scan de tabela completo é realmente *mais rápido* do que usar um índice.

Isto resume-se frequentemente à **SARGability** (Search Argumentability). Um filtro é SARGable se o SQL Server puder usar um índice eficientemente para aplicá-lo.

Exemplos de coisas que podem prejudicar a SARGability de uma perspetiva AL (e frequentemente levam a scans de tabela):
* Filtrar em funções aplicadas a campos (por exemplo, \`SETFILTER(Description, '@*termo*')\` pode impedir o uso do índice em \`Description\`, a menos que um índice de texto completo esteja no lugar e a sintaxe esteja correta).
* Usar negações de formas complexas (por exemplo, \`SETFILTER("No.", '<>C00001'\`) geralmente está bem, mas combinações podem confundir o otimizador).
* Expressões complexas em filtros que não são comparações simples.

Embora o AL abstraia o SQL, é crítico compreender que certos padrões de filtro impedem o uso eficaz de índices. Precisa de estruturar as suas chamadas \`SETRANGE\` e \`SETFILTER\` para serem o mais amigáveis possível para índices.

**O Segredo:** Ao enfrentar problemas de desempenho em leituras filtradas, suspeite da *natureza* do filtro em si. Simplifique filtros sempre que possível, evite aplicar funções nos critérios de filtro se puder filtrar pelo valor do campo bruto, e teste combinações de filtros. O AL Profiler ou examinar traces de SQL (se tiver acesso em ambientes on-premise ou sandbox) pode confirmar se um índice está a ser ignorado e um scan está a ocorrer.

## Problemas de Bloqueio: Quando o Seu Código Bloqueia Todos os Outros

O desempenho não se resume apenas à rapidez com que *o seu* código corre; trata-se de como o seu código impacta *todo o sistema*. Má gestão de transações e bloqueios podem paralisar um sistema ocupado.

Sempre que o seu código lê ou escreve dados, adquire bloqueios. Se mantiver bloqueios por muito tempo, ou solicitar bloqueios incompatíveis em dados que outra pessoa está a usar, cria *bloqueio*. Os utilizadores veem a roda a girar e os processos expiram.

Padrões AL comuns que levam a problemas de bloqueio:
* Executar lógica de negócio demorada *entre* um \`FIND\` e um \`MODIFY\`/\`INSERT\`/\`DELETE\`. Mantém bloqueios nos registos enquanto faz trabalho não relacionado.
* Percorrer muitos registos e executar \`MODIFY\`/\`INSERT\` dentro do loop sem considerar o âmbito da transação. Cada escrita adquire e mantém bloqueios.
* Usar \`COMMIT\` dentro de um loop de processo demorado. Isto liberta bloqueios para o lote *commitado*, mas pode não ser o limite de transação ideal e pode levar a atualizações parciais se passos posteriores falharem.
* Não compreender a diferença entre bloqueios de leitura (partilhados, permitindo que outros leiam) e bloqueios de escrita (exclusivos, bloqueando outros). \`LOCKTABLE\` deve ser usado criteriosamente e com compreensão.

**O Segredo:** Projete os seus processos para minimizar o tempo que os bloqueios são mantidos. Realize cálculos e validações *antes* de começar a escrever dados. Ao modificar muitos registos, considere dividir o processo em lotes menores e transacionalmente seguros, se possível. Compreenda o impacto do \`COMMIT\` e evite espalhá-los aleatoriamente. Para atualizações críticas em registos únicos, considere \`LOCKTABLE\` cuidadosamente, mas esteja ciente de que pode causar contenção.

## O AL Profiler: O Seu Melhor Amigo na Batalha pelo Desempenho

Já o mencionei antes, mas merece um ponto próprio. O AL Profiler no VS Code é uma ferramenta indispensável, e muitos developers usam apenas as suas funcionalidades mais básicas.

Vá para lá de apenas ver qual função demorou mais. Analise a *árvore de chamadas* para entender a sequência de operações. Olhe para os "Database Totals" e "Service Totals" – estes números dizem-lhe quanto tempo foi gasto à espera da base de dados versus a executar código AL. Tempo alto de base de dados frequentemente aponta para queries ineficientes ou problemas de bloqueio. Tempo alto de serviço pode indicar lógica AL ligada à CPU ou chamadas excessivas entre a camada de serviço.

**O Segredo:** Aprenda a interpretar profundamente a saída do Profiler. Não se trata apenas de encontrar a linha mais lenta; trata-se de compreender o *padrão* de execução e a interação com o armazenamento de dados subjacente. Correlacione os tempos com os padrões AL que discutimos. Vê chamadas excessivas à base de dados dentro de um loop? Isso é provavelmente o seu problema de junção implícita/FlowField. Vê tempos de espera altos? Isso pode ser bloqueio.

## Conclusão: Tornando-se um Savant de Desempenho

Escrever código AL performático não é apenas saber sintaxe; trata-se de compreender a máquina por baixo. Ao olhar para lá das operações \`FIND\` básicas e considerar as implicações das junções implícitas, a necessidade de \`SETLOADFIELDS\`, as subtilezas da SARGability de filtros e o impacto do bloqueio, passa de um developer que escreve código que *funciona* para um developer que escreve código que *tem desempenho*.

Estas são apenas algumas áreas onde o desempenho pode inesperadamente cair. Existem outras - relações complexas de Data Item em relatórios, XMLports ineficientes, uso excessivo de tabelas temporárias sem chaves adequadas, e muito mais. Mas dominar a interação com a base de dados através de padrões de query inteligentes e gestão de transações é fundamental.

Portanto, da próxima vez que o seu código estiver lento, respire fundo. Verifique as coisas simples, sim, mas depois comece a pensar como a camada de serviço e o SQL Optimizer. Onde podem estar a acontecer ações implícitas ou recuperação de dados ineficiente?

Quais são as suas histórias de guerra de desempenho mais frustrantes no Business Central? Partilhe-as nos comentários abaixo! Vamos aprender uns com os outros.

---`,Ua=`# Navigating the Upgrade Gauntlet: Building Extensions That Survive and Thrive Across BC Versions

The Business Central cloud is a landscape of continuous evolution. New features arrive monthly, and major version updates land every six months. For developers, this presents a unique challenge: ensuring your extensions don't just work *today*, but continue to function flawlessly after every single platform update.

This isn't just about fixing compile errors after an upgrade; it's about designing your extensions from the ground up to be resilient to change in the base application. It's about anticipating how Microsoft's own evolution might impact your code and planning for it. Let's talk about navigating this "Upgrade Gauntlet" and building extensions that thrive, not just survive.

## Understanding the Sources of Upgrade Pain

Why do extensions break during upgrades? The most common culprits are:

1.  **Breaking Changes in Base App Code:** Microsoft refactors codeunits, changes method signatures, deprecates functionality. If your extension directly calls base app code that changes, you're in trouble.
2.  **Event Signature Changes or Deprecations:** While events are designed for decoupling, sometimes event signatures must change, or old events are retired. If your subscriber relies on a specific signature that's altered, your code stops running.
3.  **UI Changes:** Page layouts change, controls are moved or renamed. If your extension relies on specific UI elements via control add-ins or complex page extensions that make assumptions about layout, they can break.
4.  **Schema Changes (Less Common, but Possible):** While rare for core tables in minor/major updates without clear deprecation, changes to table structures that your extension heavily relies on can cause issues.
5.  **Data Upgrade Issues:** Your extension might require data transformations between versions, and the data upgrade codeunit needs to handle this reliably and efficiently.

## Building for Resilience: Design Strategies

The best defense is a good offense – specifically, good design that minimizes coupling to volatile parts of the base application.

* **Maximize Use of Public APIs and Events:** This is the golden rule. Microsoft commits to stability for public APIs and events. Rely on these documented extension points whenever possible, rather than reaching into internal base app codeunits.
* **Abstract Base App Interactions:** If you *must* interact with internal base app logic that you suspect might change, wrap it in a dedicated codeunit or interface within *your* extension. If the base app changes, you only need to update your wrapper, not every place that used that logic.
* **Design Thin Event Subscribers:** As we discussed in the integration post, event subscribers should ideally do minimal work – often just queuing a process. Avoid complex logic or calls to potentially unstable base app code directly within a subscriber. This makes subscribers less likely to break if the publisher or base app context changes slightly.
* **Decouple UI Logic:** Use control add-ins judiciously. If your extension logic is tied to specific UI control names or structures, it becomes fragile. Separate business logic from presentation as much as possible.
* **Plan Your Own Data Upgrades:** If your extension introduces new tables, fields, or requires data migration between your *own* versions, design your data upgrade codeunits carefully. They must be idempotent (running them multiple times has the same result as running once) and handle potential errors gracefully.

Here's a conceptual example of abstracting base app interaction:

// Conceptual Interface for Base App Interaction
interface IBaseAppTaxCalculator
{
    /// <summary>
    /// Calculates tax using the base application's logic.
    /// </summary>
    /// <param name="Amount">The amount to calculate tax on.</param>
    /// <returns>The calculated tax amount.</returns>
    procedure CalculateTax(Amount: Decimal): Decimal;
}

// Conceptual Implementation wrapping Base App functionality
codeunit 50200 "Base App Tax Calc Wrapper" implements IBaseAppTaxCalculator
{
    // This codeunit might call actual base app tax calculation functions
    // in codeunits like Codeunit "Sales Tax Management" or similar,
    // abstracting their specific names or parameters behind the interface.
    local procedure GetBaseAppTaxManagementCodeunit(): Codeunit "Sales Tax Management"; // Example base app codeunit
    var
        BaseAppTaxMgt: Codeunit "Sales Tax Management";
    begin
        // Potentially complex logic to get the right base app instance/codeunit
        exit(BaseAppTaxMgt);
    end;

    procedure CalculateTax(Amount: Decimal): Decimal
    var
        BaseAppTaxMgt: Codeunit "Sales Tax Management";
        TaxAmount: Decimal;
    begin
        // Call the wrapped base app logic
        BaseAppTaxMgt := GetBaseAppTaxManagementCodeunit();
        // Assuming a method exists - parameter names/types might change in base app
        // This wrapper handles that change if it happens.
        TaxAmount := BaseAppTaxMgt.CalculateSalesTax(Amount, CurrFieldNo, xRec, DimSetID); // Hypothetical base app method call

        exit(TaxAmount);
    end;
}

// Codeunit in YOUR extension that needs tax calculation
codeunit 50201 "My Extension Sales Line Logic"
{
    // Depend on the interface, not the specific wrapper or base app codeunit
    local procedure GetTaxCalculator(): interface IBaseAppTaxCalculator;
    var
        BaseAppCalcWrapper: Codeunit "Base App Tax Calc Wrapper";
        // Potential future alternative implementation:
        // MyCustomTaxCalc: Codeunit "My Custom Complex Tax Calc" implements IBaseAppTaxCalculator;
    begin
        // Simple DI - in reality might be based on setup/config
        exit(BaseAppCalcWrapper);
        // Or if using MyCustomTaxCalc based on config:
        // if UseCustomTaxCalcSetup then exit(MyCustomTaxCalc) else exit(BaseAppCalcWrapper);
    end;

    procedure ProcessSalesLine(var SalesLine: Record "Sales Line")
    var
        TaxCalculator: interface IBaseAppTaxCalculator;
        CalculatedTax: Decimal;
    begin
        TaxCalculator := GetTaxCalculator(); // Get the appropriate calculator via interface

        // Use the interface - code here doesn't need to know HOW tax is calculated
        CalculatedTax := TaxCalculator.CalculateTax(SalesLine.Amount);

        SalesLine."Tax Amount" := CalculatedTax;
        SalesLine.MODIFY();

        // If base app tax calculation method signature changes, ONLY the "Base App Tax Calc Wrapper" needs updating.
        // "My Extension Sales Line Logic" remains unchanged as long as IBaseAppTaxCalculator doesn't change.
    end;
}

## Testing Your Upgrade Path

Writing code that *should* upgrade is one thing; verifying it *does* upgrade is another. Manual testing after every update is unsustainable. You need automated strategies.

* **Automated Test Codeunits:** Build comprehensive automated tests for your extension's core business logic. These tests are your first line of defense. After a base app update, run your tests. If they pass, you have a high degree of confidence your core functionality is intact.
* **Upgrade Test Codeunits:** Business Central supports dedicated Upgrade Test codeunits. These are designed to run specifically during the upgrade process. Use these to verify:
    * Your data upgrade codeunit ran correctly.
    * Key configuration or setup data in your tables is correct after the upgrade.
    * Basic functionality of your extension is working immediately post-upgrade.

Here’s a conceptual look at an Upgrade Test codeunit:

// Conceptual Upgrade Test Codeunit
codeunit 132010 "My Extension Upgrade Tests"
{
    Subtype := Test;
    // Add relevant test dependencies

    [Test]
    [Scope('OnPrem')] // Might need specific scope/setup for upgrade tests
    procedure VerifySetupDataMigrated()
    var
        MyExtensionSetup: Record "My Extension Setup";
        Assert: Codeunit Assert;
        ExpectedValue: Text;
        ActualValue: Text;
    begin
        // [SCENARIO] Verify setup data is correct after upgrade
        // [GIVEN] The system has been upgraded
        // [WHEN] We read the setup data
        MyExtensionSetup.GET(); // Assuming it's a singleton

        // [THEN] Specific fields should have expected values after the upgrade process
        ExpectedValue := 'New Default Value V2'; // Value expected after upgrade
        ActualValue := MyExtensionSetup."Some Configuration Field";

        Assert.AreEqual(ExpectedValue, ActualValue, 'Setup data was not migrated correctly during upgrade.');

        // Add more assertions for other setup fields, data transformations, etc.
    end;

    [Test]
    [Scope('OnPrem')]
     procedure VerifyKeyFunctionalityPostUpgrade()
     var
        MyCoreProcess: Codeunit "My Core Business Logic";
        Assert: Codeunit Assert;
        InputParameter: Integer;
        ExpectedOutput: Text;
        ActualOutput: Text;
     begin
        // [SCENARIO] Verify a key business process still works post-upgrade
        // [GIVEN] The system has been upgraded
        // [WHEN] We execute a core process
        InputParameter := 10;
        ExpectedOutput := 'Processed: 10 - V2 Logic'; // Expected output based on post-upgrade logic

        // Assuming MyCoreProcess might have internal dependencies potentially affected by base app changes
        ActualOutput := MyCoreProcess.ExecuteLogic(InputParameter);

        // [THEN] The output should match the expected result for the new version
        Assert.AreEqual(ExpectedOutput, ActualOutput, 'Core business logic failed post-upgrade.');

        // Add more tests for other critical functions
     end;

    // More upgrade test procedures can be added here...
}

* **Automated Testing Pipelines (DevOps):** Integrate your automated tests into a CI/CD pipeline. Configure your pipeline to build and test your extension against *new* versions of the base application as soon as they become available (e.g., in preview environments). This gives you early warning of potential upgrade issues.
* **Preview Environments:** Utilize the BC preview environments Microsoft provides before major updates. Deploy your extension there and run your automated tests (and maybe some targeted manual tests for UI).

## Handling Deprecations and Breaking Changes Proactively

Microsoft publishes lists of deprecated features and breaking changes with each release. Make reviewing these a standard part of your development lifecycle.

* **Monitor Deprecation Warnings:** Pay attention to compiler warnings related to deprecated features you might be using. Address them before the feature is removed entirely.
* **Review Release Plans:** Understand what changes are coming in the base application that might impact areas your extension touches.
* **Use Feature Flags (If Applicable):** For major changes within your *own* extension that require a data upgrade or behavioral shift, consider using feature flags to roll out the change gradually or allow rollback.

## Conclusion: Making Upgrades Predictable

The Business Central upgrade gauntlet can seem intimidating, but with the right mindset and tools, it becomes predictable. By focusing on resilient design using public extension points, abstracting dependencies, and implementing comprehensive automated testing (including upgrade tests), you can significantly reduce the time and effort required after each Business Central update.

Embrace the continuous update cycle as an opportunity to build stronger, more adaptable extensions. Your future self, and your clients, will thank you.

What are your biggest challenges or successes with BC upgrades? Share your strategies in the comments below!

---`,Va=`# Navegar a Pista de Obstáculos das Atualizações: Construir Extensões Que Sobrevivem e Prosperam em Várias Versões BC

A cloud do Business Central é uma paisagem de evolução contínua. Novas funcionalidades chegam mensalmente, e atualizações de versão principais aterram a cada seis meses. Para os developers, isto apresenta um desafio único: garantir que as vossas extensões não só funcionam *hoje*, mas continuam a funcionar impecavelmente após cada atualização da plataforma.

Isto não se trata apenas de corrigir erros de compilação após uma atualização; trata-se de desenhar as vossas extensões desde o início para serem resilientes à mudança na aplicação base. Trata-se de antecipar como a própria evolução da Microsoft pode impactar o vosso código e planear para isso. Vamos falar sobre navegar esta "Pista de Obstáculos das Atualizações" e construir extensões que prosperam, não apenas sobrevivem.

## Compreender as Fontes da Dor das Atualizações

Porque é que as extensões quebram durante as atualizações? Os culpados mais comuns são:

1.  **Breaking Changes no Código da Base App:** A Microsoft refatora codeunits, muda assinaturas de métodos, deprecia funcionalidades. Se a vossa extensão chama diretamente código da base app que muda, estão com problemas.
2.  **Mudanças ou Depreciações em Assinaturas de Eventos:** Embora os eventos sejam projetados para desacoplamento, às vezes as assinaturas de eventos precisam mudar, ou eventos antigos são retirados. Se o vosso subscritor depende de uma assinatura específica que é alterada, o vosso código para de correr.
3.  **Mudanças na UI:** Layouts de páginas mudam, controlos são movidos ou renomeados. Se a vossa extensão depende de elementos específicos da UI via control add-ins ou page extensions complexas que fazem suposições sobre o layout, podem quebrar.
4.  **Mudanças de Schema (Menos Comum, mas Possível):** Embora raro para tabelas centrais em atualizações menores/maiores sem depreciação clara, mudanças nas estruturas das tabelas das quais a vossa extensão depende fortemente podem causar problemas.
5.  **Problemas de Atualização de Dados:** A vossa extensão pode exigir transformações de dados entre versões, e a codeunit de atualização de dados precisa de lidar com isto de forma fiável e eficiente.

## Construir para Resiliência: Estratégias de Design

A melhor defesa é um bom ataque – especificamente, um bom design que minimiza o acoplamento a partes voláteis da aplicação base.

* **Maximizar o Uso de APIs Públicas e Eventos:** Esta é a regra de ouro. A Microsoft compromete-se com a estabilidade para APIs e eventos públicos. Confiem nestes pontos de extensão documentados sempre que possível, em vez de aceder a codeunits internas da base app.
* **Abstrair Interações com a Base App:** Se *tiverem* de interagir com lógica interna da base app que suspeitam que pode mudar, envolvam-na numa codeunit ou interface dedicada *dentro* da vossa extensão. Se a base app mudar, só precisam de atualizar o vosso wrapper, não todos os locais que usaram essa lógica.
* **Desenhar Subscritores de Eventos Finos:** Como discutimos no post sobre integrações, os subscritores de eventos devem idealmente fazer o mínimo trabalho – frequentemente apenas enfileirar um processo. Evitem lógica complexa ou chamadas a código potencialmente instável da base app diretamente dentro de um subscritor. Isto torna os subscritores menos propensos a quebrar se o publisher ou o contexto da base app mudar ligeiramente.
* **Desacoplar Lógica da UI:** Usem control add-ins criteriosamente. Se a lógica da vossa extensão estiver ligada a nomes ou estruturas específicas de controlos da UI, torna-se frágil. Separar a lógica de negócio da apresentação o máximo possível.
* **Planear as Vossas Próprias Atualizações de Dados:** Se a vossa extensão introduz novas tabelas, campos, ou exige migração de dados entre as *vossas próprias* versões, desenhem as vossas codeunits de atualização de dados cuidadosamente. Elas devem ser idempotentes (executá-las várias vezes tem o mesmo resultado que executar uma vez) e lidar com erros potenciais de forma graciosa.

Aqui está um exemplo conceptual de abstrair a interação com a base app:

// Interface Conceptual para Interação com a Base App
interface IBaseAppTaxCalculator
{
    /// <summary>
    /// Calcula imposto usando a lógica da aplicação base.
    /// </summary>
    /// <param name="Amount">O valor sobre o qual calcular imposto.</param>
    /// <returns>O valor de imposto calculado.</returns>
    procedure CalculateTax(Amount: Decimal): Decimal;
}

// Implementação Conceptual envolvendo a funcionalidade da Base App
codeunit 50200 "Base App Tax Calc Wrapper" implements IBaseAppTaxCalculator
{
    // Esta codeunit pode chamar funções reais de cálculo de imposto da base app
    // em codeunits como Codeunit "Sales Tax Management" ou similar,
    // abstraindo os seus nomes específicos ou parâmetros por trás da interface.
    local procedure GetBaseAppTaxManagementCodeunit(): Codeunit "Sales Tax Management"; // Exemplo de codeunit da base app
    var
        BaseAppTaxMgt: Codeunit "Sales Tax Management";
    begin
        // Lógica potencialmente complexa para obter a instância/codeunit correta da base app
        exit(BaseAppTaxMgt);
    end;

    procedure CalculateTax(Amount: Decimal): Decimal
    var
        BaseAppTaxMgt: Codeunit "Sales Tax Management";
        TaxAmount: Decimal;
    begin
        // Chamar a lógica envolvida da base app
        BaseAppTaxMgt := GetBaseAppTaxManagementCodeunit();
        // Assumindo que um método existe - nomes/tipos de parâmetros podem mudar na base app
        // Este wrapper lida com essa mudança se ela ocorrer.
        TaxAmount := BaseAppTaxMgt.CalculateSalesTax(Amount, CurrFieldNo, xRec, DimSetID); // Chamada hipotética de método da base app

        exit(TaxAmount);
    end;
}

// Codeunit na VOSSA extensão que precisa de cálculo de imposto
codeunit 50201 "My Extension Sales Line Logic"
{
    // Depender da interface, não do wrapper específico ou da codeunit da base app
    local procedure GetTaxCalculator(): interface IBaseAppTaxCalculator;
    var
        BaseAppCalcWrapper: Codeunit "Base App Tax Calc Wrapper";
        // Potencial implementação alternativa futura:
        // MyCustomTaxCalc: Codeunit "My Custom Complex Tax Calc" implements IBaseAppTaxCalculator;
    begin
        // Injeção de Dependência simples - na realidade pode ser baseada em setup/config
        exit(BaseAppCalcWrapper);
        // Ou se estiver a usar MyCustomTaxCalc baseado em config:
        // if UseCustomTaxCalcSetup then exit(MyCustomTaxCalc) else exit(BaseAppCalcWrapper);
    end;

    procedure ProcessSalesLine(var SalesLine: Record "Sales Line")
    var
        TaxCalculator: interface IBaseAppTaxCalculator;
        CalculatedTax: Decimal;
    begin
        TaxCalculator := GetTaxCalculator(); // Obter o calculador apropriado via interface

        // Usar a interface - código aqui não precisa saber COMO o imposto é calculado
        CalculatedTax := TaxCalculator.CalculateTax(SalesLine.Amount);

        SalesLine."Tax Amount" := CalculatedTax;
        SalesLine.MODIFY();

        // Se a assinatura do método de cálculo de imposto da base app mudar, APENAS o "Base App Tax Calc Wrapper" precisa de ser atualizado.
        // "My Extension Sales Line Logic" permanece inalterada enquanto a IBaseAppTaxCalculator não mudar.
    end;
}

## Testar a Vossa Pista de Atualização

Escrever código que *deve* atualizar é uma coisa; verificar se *atualiza* é outra. Testar manualmente após cada atualização é insustentável. Precisam de estratégias automatizadas.

* **Codeunits de Teste Automatizado:** Construam testes automatizados abrangentes para a lógica de negócio central da vossa extensão. Estes testes são a vossa primeira linha de defesa. Após uma atualização da base app, executem os vossos testes. Se passarem, têm um alto grau de confiança de que a vossa funcionalidade central está intacta.
* **Codeunits de Teste de Atualização:** O Business Central suporta codeunits de Teste de Atualização dedicadas. Estas são projetadas para correr especificamente durante o processo de atualização. Usem-nas para verificar:
    * A vossa codeunit de atualização de dados correu corretamente.
    * Dados chave de configuração ou setup nas vossas tabelas estão corretos após a atualização.
    * A funcionalidade básica da vossa extensão está a funcionar imediatamente após a atualização.

Aqui está uma visão conceptual de uma codeunit de Teste de Atualização:

// Codeunit Conceitual de Teste de Atualização
codeunit 132010 "My Extension Upgrade Tests"
{
    Subtype := Test;
    // Adicionar dependências de teste relevantes

    [Test]
    [Scope('OnPrem')] // Pode precisar de scope/setup específico para testes de atualização
    procedure VerifySetupDataMigrated()
    var
        MyExtensionSetup: Record "My Extension Setup";
        Assert: Codeunit Assert;
        ExpectedValue: Text;
        ActualValue: Text;
    begin
        // [CENÁRIO] Verificar se os dados de setup estão corretos após a atualização
        // [DADO] O sistema foi atualizado
        // [QUANDO] Lemos os dados de setup
        MyExtensionSetup.GET(); // Assumindo que é um singleton

        // [ENTÃO] Campos específicos devem ter valores esperados após o processo de atualização
        ExpectedValue := 'Novo Valor Padrão V2'; // Valor esperado após a atualização
        ActualValue := MyExtensionSetup."Some Configuration Field";

        Assert.AreEqual(ExpectedValue, ActualValue, 'Os dados de setup não foram migrados corretamente durante a atualização.');

        // Adicionar mais asserções para outros campos de setup, transformações de dados, etc.
    end;

    [Test]
    [Scope('OnPrem')]
     procedure VerifyKeyFunctionalityPostUpgrade()
     var
        MyCoreProcess: Codeunit "My Core Business Logic";
        Assert: Codeunit Assert;
        InputParameter: Integer;
        ExpectedOutput: Text;
        ActualOutput: Text;
     begin
        // [CENÁRIO] Verificar se um processo de negócio chave ainda funciona após a atualização
        // [DADO] O sistema foi atualizado
        // [QUANDO] Executamos um processo central
        InputParameter := 10;
        ExpectedOutput := 'Processado: 10 - Lógica V2'; // Saída esperada com base na lógica pós-atualização

        // Assumindo que MyCoreProcess pode ter dependências internas potencialmente afetadas por mudanças na base app
        ActualOutput := MyCoreProcess.ExecuteLogic(InputParameter);

        // [ENTÃO] A saída deve corresponder ao resultado esperado para a nova versão
        Assert.AreEqual(ExpectedOutput, ActualOutput, 'A lógica de negócio central falhou após a atualização.');

        // Adicionar mais testes para outras funções críticas
     end;

    // Mais procedimentos de teste de atualização podem ser adicionados aqui...
}

* **Pipelines de Teste Automatizado (DevOps):** Integrem os vossos testes automatizados num pipeline de CI/CD. Configurem o vosso pipeline para construir e testar a vossa extensão contra *novas* versões da aplicação base assim que estiverem disponíveis (por exemplo, em ambientes de preview). Isto dá-vos aviso antecipado de potenciais problemas de atualização.
* **Ambientes de Preview:** Utilizem os ambientes de preview do BC que a Microsoft fornece antes das atualizações principais. Implementem a vossa extensão lá e executem os vossos testes automatizados (e talvez alguns testes manuais direcionados para a UI).

## Lidar com Depreciações e Breaking Changes Proactivamente

A Microsoft publica listas de funcionalidades depreciadas e breaking changes a cada release. Façam da revisão destas listas uma parte padrão do vosso ciclo de desenvolvimento.

* **Monitorizar Avisos de Depreciação:** Prestem atenção aos avisos do compilador relacionados com funcionalidades depreciadas que possam estar a usar. Resolvam-nos antes que a funcionalidade seja removida inteiramente.
* **Rever Planos de Release:** Compreendam que mudanças estão a chegar na aplicação base que podem impactar áreas que a vossa extensão toca.
* **Usar Feature Flags (Se Aplicável):** Para mudanças principais dentro da *vossa própria* extensão que exijam uma atualização de dados ou uma mudança de comportamento, considerem usar feature flags para implementar a mudança gradualmente ou permitir retroceder.

## Conclusão: Tornando as Atualizações Previsíveis

A pista de obstáculos das atualizações do Business Central pode parecer intimidante, mas com a mentalidade e as ferramentas certas, torna-se previsível. Ao focar num design resiliente usando pontos de extensão públicos, abstraindo dependências e implementando testes automatizados abrangentes (incluindo testes de atualização), podem reduzir significativamente o tempo e o esforço necessários após cada atualização do Business Central.

Abraçem o ciclo de atualização contínua como uma oportunidade para construir extensões mais fortes e adaptáveis. O vosso eu futuro, e os vossos clientes, agradecer-vos-ão.

Quais são os vossos maiores desafios ou sucessos com as atualizações do BC? Partilhem as vossas estratégias nos comentários abaixo!

---`,Ha=`In our [previous post on Getting Started with AL Development](/blog/getting-started-al-dev), we touched upon the core concepts of building extensions for Dynamics 365 Business Central. Now, let's explore one of the most powerful mechanisms for creating **decoupled** and **maintainable** code: **Events and Subscribers**.

## The Problem with Direct Modification (The Old Way)

In older NAV versions (C/AL), customizing often involved directly modifying base application objects (tables, pages, codeunits). While effective, this created significant challenges during upgrades, as custom code needed to be manually merged with new base application code – a time-consuming and error-prone process.

## The Solution: Event-Driven Architecture

Business Central adopts an event-driven model. Instead of changing base code, Microsoft (and other extension developers) *publish* **events** at specific points in the code execution (e.g., before validating a field, after posting a document, when initializing a page).

Your custom extension can then *subscribe* to these events. When an event is triggered (published), all its subscribers are automatically executed.

## Key Components

1.  **Event Publishers:** These are functions (typically within base application codeunits or declared on table/page triggers) marked with specific attributes (\`[IntegrationEvent(...)]\`, \`[BusinessEvent(...)]\`). They define the *signal* that something has happened and specify any parameters (data) being passed along with the event.
2.  **Event Subscribers:** These are functions within your extension's codeunits marked with the \`[EventSubscriber(...)]\` attribute. This attribute specifies:
    *   Which object the event publisher resides in.
    *   The name of the event publisher function.
    *   Optionally, filters like the specific table or page the event relates to.
    *   The subscriber function *must* have parameters matching those defined by the publisher.

## Why Use Events?

*   **Upgrade Safety:** Your code is separate from the base application. Upgrades to the base app generally don't break your subscribers (unless Microsoft fundamentally changes or removes the event itself, which is less common for integration/business events).
*   **Decoupling:** Your extension doesn't need direct knowledge of the base application's internal implementation details, only the published event's *signature*. This makes code cleaner and reduces dependencies.
*   **Extensibility:** Multiple extensions can subscribe to the same event without interfering with each other.
*   **Maintainability:** Logic related to specific events is neatly contained within subscriber codeunits.

## Example Scenario

Imagine you need to run custom logic *after* the \`Address\` field on the Customer card is validated.

1.  **Find the Event:** Look for an event publisher on the \`Customer\` table's \`Address\` field trigger, like \`OnAfterValidateEvent\`.
2.  **Create a Codeunit:** In your extension, create a new codeunit (e.g., \`MyCustomerSubscribers\`).
3.  **Create a Subscriber Function:** Inside the codeunit, create a function:

    \`\`\`al
    codeunit 50100 MyCustomerSubscribers
    {
        [EventSubscriber(ObjectType::Table, Database::Customer, 'OnAfterValidateEvent', 'Address', false, false)]
        local procedure MyCustomerAddressValidationHandler(var Rec: Record Customer; var xRec: Record Customer)
        begin
            // Your custom logic here!
            // Example: Check if the address is in a specific region and update another field.
            if Rec.Address.Contains('North') then begin
                Rec.Validate("Shipping Advice", Rec."Shipping Advice"::"Partial"); // Example action
                // Maybe call another custom function...
            end;
            // Be careful not to cause infinite loops if you modify the field triggering the event!
        end;
    }
    \`\`\`
4.  **Deploy:** Package and deploy your extension. Now, whenever the Address field on any Customer record is validated in the base application, your \`MyCustomerAddressValidationHandler\` function will automatically run.

Events and Subscribers are fundamental to modern Business Central development. Mastering them allows you to build powerful, integrated solutions while maintaining a clean separation from the core application code.`,Ga=`No nosso [post anterior sobre Introdução ao Desenvolvimento AL](/blog/getting-started-al-dev), abordámos os conceitos centrais da construção de extensões para o Dynamics 365 Business Central. Agora, vamos explorar um dos mecanismos mais poderosos para criar código **desacoplado** e de **fácil manutenção**: **Eventos e Subscritores**.

## O Problema da Modificação Direta (A Forma Antiga)

Em versões mais antigas do NAV (C/AL), a personalização envolvia frequentemente a modificação direta de objetos da aplicação base (tabelas, páginas, codeunits). Embora eficaz, isto criava desafios significativos durante as atualizações, pois o código personalizado precisava ser manualmente mesclado com o novo código da aplicação base – um processo demorado e propenso a erros.

## A Solução: Arquitetura Orientada a Eventos

O Business Central adota um modelo orientado a eventos. Em vez de alterar o código base, a Microsoft (e outros developers de extensões) *publicam* **eventos** em pontos específicos na execução do código (ex: antes de validar um campo, após lançar um documento, ao inicializar uma página).

A sua extensão personalizada pode então *subscrever* a estes eventos. Quando um evento é disparado (publicado), todos os seus subscritores são automaticamente executados.

## Componentes Chave

1.  **Publicadores de Eventos (Event Publishers):** São funções (tipicamente dentro de codeunits da aplicação base ou declaradas em triggers de tabelas/páginas) marcadas com atributos específicos (\`[IntegrationEvent(...)]\`, \`[BusinessEvent(...)]\`). Eles definem o *sinal* de que algo aconteceu e especificam quaisquer parâmetros (dados) passados juntamente com o evento.
2.  **Subscritores de Eventos (Event Subscribers):** São funções dentro das codeunits da sua extensão marcadas com o atributo \`[EventSubscriber(...)]\`. Este atributo especifica:
    *   Em qual objeto reside o publicador do evento.
    *   O nome da função publicadora do evento.
    *   Opcionalmente, filtros como a tabela ou página específica à qual o evento se refere.
    *   A função subscritora *deve* ter parâmetros que correspondam aos definidos pelo publicador.

## Porquê Usar Eventos?

*   **Segurança nas Atualizações:** O seu código está separado da aplicação base. Atualizações à aplicação base geralmente não quebram os seus subscritores (a menos que a Microsoft altere fundamentalmente ou remova o próprio evento, o que é menos comum para eventos de integração/negócio).
*   **Desacoplamento:** A sua extensão não precisa de conhecimento direto dos detalhes internos de implementação da aplicação base, apenas da *assinatura* do evento publicado. Isto torna o código mais limpo e reduz dependências.
*   **Extensibilidade:** Múltiplas extensões podem subscrever ao mesmo evento sem interferirem umas com as outras.
*   **Manutenibilidade:** A lógica relacionada com eventos específicos está contida de forma organizada dentro das codeunits subscritoras.

## Cenário Exemplo

Imagine que precisa executar lógica personalizada *depois* do campo \`Morada\` (Address) na ficha de Cliente ser validado.

1.  **Encontrar o Evento:** Procure por um publicador de evento no trigger do campo \`Morada\` da tabela \`Cliente\`, como \`OnAfterValidateEvent\`.
2.  **Criar uma Codeunit:** Na sua extensão, crie uma nova codeunit (ex: \`MeusSubscritoresCliente\`).
3.  **Criar uma Função Subscritora:** Dentro da codeunit, crie uma função:

    \`\`\`al
    codeunit 50100 MeusSubscritoresCliente
    {
        [EventSubscriber(ObjectType::Table, Database::Customer, 'OnAfterValidateEvent', 'Address', false, false)]
        local procedure MeuManipuladorValidacaoMoradaCliente(var Rec: Record Customer; var xRec: Record Customer)
        begin
            // A sua lógica personalizada aqui!
            // Exemplo: Verificar se a morada está numa região específica e atualizar outro campo.
            if Rec.Address.Contains('Norte') then begin
                Rec.Validate("Shipping Advice", Rec."Shipping Advice"::"Partial"); // Ação exemplo
                // Talvez chamar outra função personalizada...
            end;
            // Tenha cuidado para não causar loops infinitos se modificar o campo que dispara o evento!
        end;
    }
    \`\`\`
4.  **Implementar:** Empacote e implemente a sua extensão. Agora, sempre que o campo Morada em qualquer registo de Cliente for validado na aplicação base, a sua função \`MeuManipuladorValidacaoMoradaCliente\` será executada automaticamente.

Eventos e Subscritores são fundamentais para o desenvolvimento moderno do Business Central. Dominá-los permite construir soluções poderosas e integradas, mantendo uma separação limpa do código da aplicação principal.`,Wa=`Dynamics 365 Business Central offers robust ERP capabilities, but its true power lies in **customization** through extensions. The primary language for this is **AL (Application Language)**, a modern language designed specifically for BC development. Let's dive into the basics.

## What is AL?

AL is an object-oriented language heavily influenced by C/AL (its predecessor in NAV) but modernized with syntax similar to C# and features suited for extension-based development. Unlike C/AL modifications, AL extensions are separate packages that *extend* the base application without altering the original code. This makes upgrades significantly easier and safer.

## Setting Up Your Environment

1.  **Visual Studio Code:** The official IDE for AL development. It's free, powerful, and cross-platform.
2.  **AL Language Extension:** Install the official 'AL Language' extension from Microsoft in VS Code. This provides IntelliSense, snippets, debugging, and deployment tools.
3.  **Docker Container / BC Sandbox:** You need a Business Central environment to test against. Microsoft provides Docker images for local development, or you can use an online Sandbox environment provisioned through your BC instance or Partner Center.

## Key Concepts

*   **Objects:** AL development revolves around creating or extending objects like Tables, Pages, Codeunits, Reports, Queries, XMLports, and Enums/Interfaces.
*   **Extensions:** Your code lives within an 'app' (extension package). You can extend existing objects (e.g., add a field to the Customer table, add an action to the Customer List page) or create entirely new ones.
*   **Events & Subscribers:** Instead of modifying base code, you subscribe to *events* published by the base application (e.g., \\\`OnAfterValidateEvent\\\` on a table field) and run your custom logic in *event subscriber* codeunits.
*   **Dependencies:** Your extension must declare dependencies on the Microsoft base application and potentially other extensions it interacts with.
*   **App Manifest (\\\`app.json\\\`):** This file defines your extension's metadata (ID, name, publisher, version, dependencies, etc.).

## Your First Extension (Example Idea)

A common starting point is adding a custom field to the 'Customer' table and displaying it on the 'Customer Card' page.

1.  Create a new AL project in VS Code (\\\`AL: Go!\\\`).
2.  Define a **Table Extension** object to add your field (\\\`MyCustomField\\\`) to the \\\`Customer\\\` table.
3.  Define a **Page Extension** object to add a control showing \\\`MyCustomField\\\` on the \\\`Customer Card\\\` page, placing it in a suitable group (e.g., 'General').
4.  Package (\\\`Ctrl+Shift+B\\\`) and Deploy (\\\`F5\\\`) to your Sandbox/Docker.
5.  Test!

AL development opens up vast possibilities for tailoring Business Central to specific business needs. This is just the beginning – explore table relations, actions, report layouts, APIs, and more!`,Qa=`Dynamics 365 Business Central offers robust ERP capabilities, mas o seu verdadeiro poder reside na **personalização** através de extensões. A linguagem principal para isto é a **AL (Application Language)**, uma linguagem moderna desenhada especificamente para o desenvolvimento em BC. Vamos mergulhar nos básicos.

## O que é AL?

AL é uma linguagem orientada a objetos fortemente influenciada pelo C/AL (o seu predecessor no NAV), mas modernizada com uma sintaxe semelhante a C# e funcionalidades adequadas para o desenvolvimento baseado em extensões. Ao contrário das modificações C/AL, as extensões AL são pacotes separados que *estendem* a aplicação base sem alterar o código original. Isto torna as atualizações significativamente mais fáceis e seguras.

## Configurar o Seu Ambiente

1.  **Visual Studio Code:** O IDE oficial para desenvolvimento AL. É gratuito, poderoso e multiplataforma.
2.  **Extensão AL Language:** Instale a extensão oficial 'AL Language' da Microsoft no VS Code. Esta fornece IntelliSense, snippets, ferramentas de depuração e implementação.
3.  **Container Docker / Sandbox BC:** Precisa de um ambiente Business Central para testar. A Microsoft fornece imagens Docker para desenvolvimento local, ou pode usar um ambiente Sandbox online provisionado através da sua instância BC ou Partner Center.

## Conceitos Chave

*   **Objetos:** O desenvolvimento AL gira em torno da criação ou extensão de objetos como Tabelas, Páginas, Codeunits, Relatórios, Consultas, XMLports e Enums/Interfaces.
*   **Extensões:** O seu código reside numa 'app' (pacote de extensão). Pode estender objetos existentes (ex: adicionar um campo à tabela Cliente, adicionar uma ação à página Lista de Clientes) ou criar novos completamente.
*   **Eventos e Subscritores:** Em vez de modificar código base, subscreve a *eventos* publicados pela aplicação base (ex: \\\`OnAfterValidateEvent\\\` num campo de tabela) e executa a sua lógica personalizada em codeunits *subscritoras de eventos*.
*   **Dependências:** A sua extensão deve declarar dependências na aplicação base da Microsoft e potentially noutras extensões com as quais interage.
*   **Manifesto da App (\\\`app.json\\\`):** Este ficheiro define os metadados da sua extensão (ID, nome, editor, versão, dependências, etc.).

## A Sua Primeira Extensão (Ideia de Exemplo)

Um ponto de partida comum é adicionar um campo personalizado à tabela 'Cliente' e exibi-lo na página 'Ficha de Cliente'.

1.  Crie um novo projeto AL no VS Code (\\\`AL: Go!\\\`).
2.  Defina um objeto **Table Extension** para adicionar o seu campo (\\\`MeuCampoCustom\\\`) à tabela \\\`Cliente\\\`.
3.  Defina um objeto **Page Extension** para adicionar um controlo que mostra \\\`MeuCampoCustom\\\` na página \\\`Ficha de Cliente\\\`, colocando-o num grupo adequado (ex: 'Geral').
4.  Empacote (\\\`Ctrl+Shift+B\\\`) e Implemente (\\\`F5\\\`) no seu Sandbox/Docker.
5.  Teste!

O desenvolvimento AL abre vastas possibilidades para adaptar o Business Central a necessidades específicas de negócio. Isto é apenas o começo – explore relações entre tabelas, ações, layouts de relatórios, APIs e muito mais!`;function Ja(e,n){const t={};return(e[e.length-1]===""?[...e,""]:e).join((t.padRight?" ":"")+","+(t.padLeft===!1?"":" ")).trim()}const Ya=/^[$_\p{ID_Start}][$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,$a=/^[$_\p{ID_Start}][-$_\u{200C}\u{200D}\p{ID_Continue}]*$/u,Xa={};function Hn(e,n){return(Xa.jsx?$a:Ya).test(e)}const Ka=/[ \t\n\f\r]/g;function Za(e){return typeof e=="object"?e.type==="text"?Gn(e.value):!1:Gn(e)}function Gn(e){return e.replace(Ka,"")===""}class Ve{constructor(n,t,a){this.normal=t,this.property=n,a&&(this.space=a)}}Ve.prototype.normal={};Ve.prototype.property={};Ve.prototype.space=void 0;function Lt(e,n){const t={},a={};for(const r of e)Object.assign(t,r.property),Object.assign(a,r.normal);return new Ve(t,a,n)}function hn(e){return e.toLowerCase()}class Z{constructor(n,t){this.attribute=t,this.property=n}}Z.prototype.attribute="";Z.prototype.booleanish=!1;Z.prototype.boolean=!1;Z.prototype.commaOrSpaceSeparated=!1;Z.prototype.commaSeparated=!1;Z.prototype.defined=!1;Z.prototype.mustUseProperty=!1;Z.prototype.number=!1;Z.prototype.overloadedBoolean=!1;Z.prototype.property="";Z.prototype.spaceSeparated=!1;Z.prototype.space=void 0;let er=0;const O=ve(),W=ve(),Pt=ve(),C=ve(),V=ve(),Ie=ve(),ne=ve();function ve(){return 2**++er}const gn=Object.freeze(Object.defineProperty({__proto__:null,boolean:O,booleanish:W,commaOrSpaceSeparated:ne,commaSeparated:Ie,number:C,overloadedBoolean:Pt,spaceSeparated:V},Symbol.toStringTag,{value:"Module"})),nn=Object.keys(gn);class An extends Z{constructor(n,t,a,r){let o=-1;if(super(n,t),Wn(this,"space",r),typeof a=="number")for(;++o<nn.length;){const i=nn[o];Wn(this,nn[o],(a&gn[i])===gn[i])}}}An.prototype.defined=!0;function Wn(e,n,t){t&&(e[n]=t)}function Ee(e){const n={},t={};for(const[a,r]of Object.entries(e.properties)){const o=new An(a,e.transform(e.attributes||{},a),r,e.space);e.mustUseProperty&&e.mustUseProperty.includes(a)&&(o.mustUseProperty=!0),n[a]=o,t[hn(a)]=a,t[hn(o.attribute)]=a}return new Ve(n,t,e.space)}const Ot=Ee({properties:{ariaActiveDescendant:null,ariaAtomic:W,ariaAutoComplete:null,ariaBusy:W,ariaChecked:W,ariaColCount:C,ariaColIndex:C,ariaColSpan:C,ariaControls:V,ariaCurrent:null,ariaDescribedBy:V,ariaDetails:null,ariaDisabled:W,ariaDropEffect:V,ariaErrorMessage:null,ariaExpanded:W,ariaFlowTo:V,ariaGrabbed:W,ariaHasPopup:null,ariaHidden:W,ariaInvalid:null,ariaKeyShortcuts:null,ariaLabel:null,ariaLabelledBy:V,ariaLevel:C,ariaLive:null,ariaModal:W,ariaMultiLine:W,ariaMultiSelectable:W,ariaOrientation:null,ariaOwns:V,ariaPlaceholder:null,ariaPosInSet:C,ariaPressed:W,ariaReadOnly:W,ariaRelevant:null,ariaRequired:W,ariaRoleDescription:V,ariaRowCount:C,ariaRowIndex:C,ariaRowSpan:C,ariaSelected:W,ariaSetSize:C,ariaSort:null,ariaValueMax:C,ariaValueMin:C,ariaValueNow:C,ariaValueText:null,role:null},transform(e,n){return n==="role"?n:"aria-"+n.slice(4).toLowerCase()}});function qt(e,n){return n in e?e[n]:n}function Dt(e,n){return qt(e,n.toLowerCase())}const nr=Ee({attributes:{acceptcharset:"accept-charset",classname:"class",htmlfor:"for",httpequiv:"http-equiv"},mustUseProperty:["checked","multiple","muted","selected"],properties:{abbr:null,accept:Ie,acceptCharset:V,accessKey:V,action:null,allow:null,allowFullScreen:O,allowPaymentRequest:O,allowUserMedia:O,alt:null,as:null,async:O,autoCapitalize:null,autoComplete:V,autoFocus:O,autoPlay:O,blocking:V,capture:null,charSet:null,checked:O,cite:null,className:V,cols:C,colSpan:null,content:null,contentEditable:W,controls:O,controlsList:V,coords:C|Ie,crossOrigin:null,data:null,dateTime:null,decoding:null,default:O,defer:O,dir:null,dirName:null,disabled:O,download:Pt,draggable:W,encType:null,enterKeyHint:null,fetchPriority:null,form:null,formAction:null,formEncType:null,formMethod:null,formNoValidate:O,formTarget:null,headers:V,height:C,hidden:O,high:C,href:null,hrefLang:null,htmlFor:V,httpEquiv:V,id:null,imageSizes:null,imageSrcSet:null,inert:O,inputMode:null,integrity:null,is:null,isMap:O,itemId:null,itemProp:V,itemRef:V,itemScope:O,itemType:V,kind:null,label:null,lang:null,language:null,list:null,loading:null,loop:O,low:C,manifest:null,max:null,maxLength:C,media:null,method:null,min:null,minLength:C,multiple:O,muted:O,name:null,nonce:null,noModule:O,noValidate:O,onAbort:null,onAfterPrint:null,onAuxClick:null,onBeforeMatch:null,onBeforePrint:null,onBeforeToggle:null,onBeforeUnload:null,onBlur:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onContextLost:null,onContextMenu:null,onContextRestored:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnded:null,onError:null,onFocus:null,onFormData:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLanguageChange:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadEnd:null,onLoadStart:null,onMessage:null,onMessageError:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRejectionHandled:null,onReset:null,onResize:null,onScroll:null,onScrollEnd:null,onSecurityPolicyViolation:null,onSeeked:null,onSeeking:null,onSelect:null,onSlotChange:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnhandledRejection:null,onUnload:null,onVolumeChange:null,onWaiting:null,onWheel:null,open:O,optimum:C,pattern:null,ping:V,placeholder:null,playsInline:O,popover:null,popoverTarget:null,popoverTargetAction:null,poster:null,preload:null,readOnly:O,referrerPolicy:null,rel:V,required:O,reversed:O,rows:C,rowSpan:C,sandbox:V,scope:null,scoped:O,seamless:O,selected:O,shadowRootClonable:O,shadowRootDelegatesFocus:O,shadowRootMode:null,shape:null,size:C,sizes:null,slot:null,span:C,spellCheck:W,src:null,srcDoc:null,srcLang:null,srcSet:null,start:C,step:null,style:null,tabIndex:C,target:null,title:null,translate:null,type:null,typeMustMatch:O,useMap:null,value:W,width:C,wrap:null,writingSuggestions:null,align:null,aLink:null,archive:V,axis:null,background:null,bgColor:null,border:C,borderColor:null,bottomMargin:C,cellPadding:null,cellSpacing:null,char:null,charOff:null,classId:null,clear:null,code:null,codeBase:null,codeType:null,color:null,compact:O,declare:O,event:null,face:null,frame:null,frameBorder:null,hSpace:C,leftMargin:C,link:null,longDesc:null,lowSrc:null,marginHeight:C,marginWidth:C,noResize:O,noHref:O,noShade:O,noWrap:O,object:null,profile:null,prompt:null,rev:null,rightMargin:C,rules:null,scheme:null,scrolling:W,standby:null,summary:null,text:null,topMargin:C,valueType:null,version:null,vAlign:null,vLink:null,vSpace:C,allowTransparency:null,autoCorrect:null,autoSave:null,disablePictureInPicture:O,disableRemotePlayback:O,prefix:null,property:null,results:C,security:null,unselectable:null},space:"html",transform:Dt}),tr=Ee({attributes:{accentHeight:"accent-height",alignmentBaseline:"alignment-baseline",arabicForm:"arabic-form",baselineShift:"baseline-shift",capHeight:"cap-height",className:"class",clipPath:"clip-path",clipRule:"clip-rule",colorInterpolation:"color-interpolation",colorInterpolationFilters:"color-interpolation-filters",colorProfile:"color-profile",colorRendering:"color-rendering",crossOrigin:"crossorigin",dataType:"datatype",dominantBaseline:"dominant-baseline",enableBackground:"enable-background",fillOpacity:"fill-opacity",fillRule:"fill-rule",floodColor:"flood-color",floodOpacity:"flood-opacity",fontFamily:"font-family",fontSize:"font-size",fontSizeAdjust:"font-size-adjust",fontStretch:"font-stretch",fontStyle:"font-style",fontVariant:"font-variant",fontWeight:"font-weight",glyphName:"glyph-name",glyphOrientationHorizontal:"glyph-orientation-horizontal",glyphOrientationVertical:"glyph-orientation-vertical",hrefLang:"hreflang",horizAdvX:"horiz-adv-x",horizOriginX:"horiz-origin-x",horizOriginY:"horiz-origin-y",imageRendering:"image-rendering",letterSpacing:"letter-spacing",lightingColor:"lighting-color",markerEnd:"marker-end",markerMid:"marker-mid",markerStart:"marker-start",navDown:"nav-down",navDownLeft:"nav-down-left",navDownRight:"nav-down-right",navLeft:"nav-left",navNext:"nav-next",navPrev:"nav-prev",navRight:"nav-right",navUp:"nav-up",navUpLeft:"nav-up-left",navUpRight:"nav-up-right",onAbort:"onabort",onActivate:"onactivate",onAfterPrint:"onafterprint",onBeforePrint:"onbeforeprint",onBegin:"onbegin",onCancel:"oncancel",onCanPlay:"oncanplay",onCanPlayThrough:"oncanplaythrough",onChange:"onchange",onClick:"onclick",onClose:"onclose",onCopy:"oncopy",onCueChange:"oncuechange",onCut:"oncut",onDblClick:"ondblclick",onDrag:"ondrag",onDragEnd:"ondragend",onDragEnter:"ondragenter",onDragExit:"ondragexit",onDragLeave:"ondragleave",onDragOver:"ondragover",onDragStart:"ondragstart",onDrop:"ondrop",onDurationChange:"ondurationchange",onEmptied:"onemptied",onEnd:"onend",onEnded:"onended",onError:"onerror",onFocus:"onfocus",onFocusIn:"onfocusin",onFocusOut:"onfocusout",onHashChange:"onhashchange",onInput:"oninput",onInvalid:"oninvalid",onKeyDown:"onkeydown",onKeyPress:"onkeypress",onKeyUp:"onkeyup",onLoad:"onload",onLoadedData:"onloadeddata",onLoadedMetadata:"onloadedmetadata",onLoadStart:"onloadstart",onMessage:"onmessage",onMouseDown:"onmousedown",onMouseEnter:"onmouseenter",onMouseLeave:"onmouseleave",onMouseMove:"onmousemove",onMouseOut:"onmouseout",onMouseOver:"onmouseover",onMouseUp:"onmouseup",onMouseWheel:"onmousewheel",onOffline:"onoffline",onOnline:"ononline",onPageHide:"onpagehide",onPageShow:"onpageshow",onPaste:"onpaste",onPause:"onpause",onPlay:"onplay",onPlaying:"onplaying",onPopState:"onpopstate",onProgress:"onprogress",onRateChange:"onratechange",onRepeat:"onrepeat",onReset:"onreset",onResize:"onresize",onScroll:"onscroll",onSeeked:"onseeked",onSeeking:"onseeking",onSelect:"onselect",onShow:"onshow",onStalled:"onstalled",onStorage:"onstorage",onSubmit:"onsubmit",onSuspend:"onsuspend",onTimeUpdate:"ontimeupdate",onToggle:"ontoggle",onUnload:"onunload",onVolumeChange:"onvolumechange",onWaiting:"onwaiting",onZoom:"onzoom",overlinePosition:"overline-position",overlineThickness:"overline-thickness",paintOrder:"paint-order",panose1:"panose-1",pointerEvents:"pointer-events",referrerPolicy:"referrerpolicy",renderingIntent:"rendering-intent",shapeRendering:"shape-rendering",stopColor:"stop-color",stopOpacity:"stop-opacity",strikethroughPosition:"strikethrough-position",strikethroughThickness:"strikethrough-thickness",strokeDashArray:"stroke-dasharray",strokeDashOffset:"stroke-dashoffset",strokeLineCap:"stroke-linecap",strokeLineJoin:"stroke-linejoin",strokeMiterLimit:"stroke-miterlimit",strokeOpacity:"stroke-opacity",strokeWidth:"stroke-width",tabIndex:"tabindex",textAnchor:"text-anchor",textDecoration:"text-decoration",textRendering:"text-rendering",transformOrigin:"transform-origin",typeOf:"typeof",underlinePosition:"underline-position",underlineThickness:"underline-thickness",unicodeBidi:"unicode-bidi",unicodeRange:"unicode-range",unitsPerEm:"units-per-em",vAlphabetic:"v-alphabetic",vHanging:"v-hanging",vIdeographic:"v-ideographic",vMathematical:"v-mathematical",vectorEffect:"vector-effect",vertAdvY:"vert-adv-y",vertOriginX:"vert-origin-x",vertOriginY:"vert-origin-y",wordSpacing:"word-spacing",writingMode:"writing-mode",xHeight:"x-height",playbackOrder:"playbackorder",timelineBegin:"timelinebegin"},properties:{about:ne,accentHeight:C,accumulate:null,additive:null,alignmentBaseline:null,alphabetic:C,amplitude:C,arabicForm:null,ascent:C,attributeName:null,attributeType:null,azimuth:C,bandwidth:null,baselineShift:null,baseFrequency:null,baseProfile:null,bbox:null,begin:null,bias:C,by:null,calcMode:null,capHeight:C,className:V,clip:null,clipPath:null,clipPathUnits:null,clipRule:null,color:null,colorInterpolation:null,colorInterpolationFilters:null,colorProfile:null,colorRendering:null,content:null,contentScriptType:null,contentStyleType:null,crossOrigin:null,cursor:null,cx:null,cy:null,d:null,dataType:null,defaultAction:null,descent:C,diffuseConstant:C,direction:null,display:null,dur:null,divisor:C,dominantBaseline:null,download:O,dx:null,dy:null,edgeMode:null,editable:null,elevation:C,enableBackground:null,end:null,event:null,exponent:C,externalResourcesRequired:null,fill:null,fillOpacity:C,fillRule:null,filter:null,filterRes:null,filterUnits:null,floodColor:null,floodOpacity:null,focusable:null,focusHighlight:null,fontFamily:null,fontSize:null,fontSizeAdjust:null,fontStretch:null,fontStyle:null,fontVariant:null,fontWeight:null,format:null,fr:null,from:null,fx:null,fy:null,g1:Ie,g2:Ie,glyphName:Ie,glyphOrientationHorizontal:null,glyphOrientationVertical:null,glyphRef:null,gradientTransform:null,gradientUnits:null,handler:null,hanging:C,hatchContentUnits:null,hatchUnits:null,height:null,href:null,hrefLang:null,horizAdvX:C,horizOriginX:C,horizOriginY:C,id:null,ideographic:C,imageRendering:null,initialVisibility:null,in:null,in2:null,intercept:C,k:C,k1:C,k2:C,k3:C,k4:C,kernelMatrix:ne,kernelUnitLength:null,keyPoints:null,keySplines:null,keyTimes:null,kerning:null,lang:null,lengthAdjust:null,letterSpacing:null,lightingColor:null,limitingConeAngle:C,local:null,markerEnd:null,markerMid:null,markerStart:null,markerHeight:null,markerUnits:null,markerWidth:null,mask:null,maskContentUnits:null,maskUnits:null,mathematical:null,max:null,media:null,mediaCharacterEncoding:null,mediaContentEncodings:null,mediaSize:C,mediaTime:null,method:null,min:null,mode:null,name:null,navDown:null,navDownLeft:null,navDownRight:null,navLeft:null,navNext:null,navPrev:null,navRight:null,navUp:null,navUpLeft:null,navUpRight:null,numOctaves:null,observer:null,offset:null,onAbort:null,onActivate:null,onAfterPrint:null,onBeforePrint:null,onBegin:null,onCancel:null,onCanPlay:null,onCanPlayThrough:null,onChange:null,onClick:null,onClose:null,onCopy:null,onCueChange:null,onCut:null,onDblClick:null,onDrag:null,onDragEnd:null,onDragEnter:null,onDragExit:null,onDragLeave:null,onDragOver:null,onDragStart:null,onDrop:null,onDurationChange:null,onEmptied:null,onEnd:null,onEnded:null,onError:null,onFocus:null,onFocusIn:null,onFocusOut:null,onHashChange:null,onInput:null,onInvalid:null,onKeyDown:null,onKeyPress:null,onKeyUp:null,onLoad:null,onLoadedData:null,onLoadedMetadata:null,onLoadStart:null,onMessage:null,onMouseDown:null,onMouseEnter:null,onMouseLeave:null,onMouseMove:null,onMouseOut:null,onMouseOver:null,onMouseUp:null,onMouseWheel:null,onOffline:null,onOnline:null,onPageHide:null,onPageShow:null,onPaste:null,onPause:null,onPlay:null,onPlaying:null,onPopState:null,onProgress:null,onRateChange:null,onRepeat:null,onReset:null,onResize:null,onScroll:null,onSeeked:null,onSeeking:null,onSelect:null,onShow:null,onStalled:null,onStorage:null,onSubmit:null,onSuspend:null,onTimeUpdate:null,onToggle:null,onUnload:null,onVolumeChange:null,onWaiting:null,onZoom:null,opacity:null,operator:null,order:null,orient:null,orientation:null,origin:null,overflow:null,overlay:null,overlinePosition:C,overlineThickness:C,paintOrder:null,panose1:null,path:null,pathLength:C,patternContentUnits:null,patternTransform:null,patternUnits:null,phase:null,ping:V,pitch:null,playbackOrder:null,pointerEvents:null,points:null,pointsAtX:C,pointsAtY:C,pointsAtZ:C,preserveAlpha:null,preserveAspectRatio:null,primitiveUnits:null,propagate:null,property:ne,r:null,radius:null,referrerPolicy:null,refX:null,refY:null,rel:ne,rev:ne,renderingIntent:null,repeatCount:null,repeatDur:null,requiredExtensions:ne,requiredFeatures:ne,requiredFonts:ne,requiredFormats:ne,resource:null,restart:null,result:null,rotate:null,rx:null,ry:null,scale:null,seed:null,shapeRendering:null,side:null,slope:null,snapshotTime:null,specularConstant:C,specularExponent:C,spreadMethod:null,spacing:null,startOffset:null,stdDeviation:null,stemh:null,stemv:null,stitchTiles:null,stopColor:null,stopOpacity:null,strikethroughPosition:C,strikethroughThickness:C,string:null,stroke:null,strokeDashArray:ne,strokeDashOffset:null,strokeLineCap:null,strokeLineJoin:null,strokeMiterLimit:C,strokeOpacity:C,strokeWidth:null,style:null,surfaceScale:C,syncBehavior:null,syncBehaviorDefault:null,syncMaster:null,syncTolerance:null,syncToleranceDefault:null,systemLanguage:ne,tabIndex:C,tableValues:null,target:null,targetX:C,targetY:C,textAnchor:null,textDecoration:null,textRendering:null,textLength:null,timelineBegin:null,title:null,transformBehavior:null,type:null,typeOf:ne,to:null,transform:null,transformOrigin:null,u1:null,u2:null,underlinePosition:C,underlineThickness:C,unicode:null,unicodeBidi:null,unicodeRange:null,unitsPerEm:C,values:null,vAlphabetic:C,vMathematical:C,vectorEffect:null,vHanging:C,vIdeographic:C,version:null,vertAdvY:C,vertOriginX:C,vertOriginY:C,viewBox:null,viewTarget:null,visibility:null,width:null,widths:null,wordSpacing:null,writingMode:null,x:null,x1:null,x2:null,xChannelSelector:null,xHeight:C,y:null,y1:null,y2:null,yChannelSelector:null,z:null,zoomAndPan:null},space:"svg",transform:qt}),Nt=Ee({properties:{xLinkActuate:null,xLinkArcRole:null,xLinkHref:null,xLinkRole:null,xLinkShow:null,xLinkTitle:null,xLinkType:null},space:"xlink",transform(e,n){return"xlink:"+n.slice(5).toLowerCase()}}),zt=Ee({attributes:{xmlnsxlink:"xmlns:xlink"},properties:{xmlnsXLink:null,xmlns:null},space:"xmlns",transform:Dt}),Ft=Ee({properties:{xmlBase:null,xmlLang:null,xmlSpace:null},space:"xml",transform(e,n){return"xml:"+n.slice(3).toLowerCase()}}),ar={classId:"classID",dataType:"datatype",itemId:"itemID",strokeDashArray:"strokeDasharray",strokeDashOffset:"strokeDashoffset",strokeLineCap:"strokeLinecap",strokeLineJoin:"strokeLinejoin",strokeMiterLimit:"strokeMiterlimit",typeOf:"typeof",xLinkActuate:"xlinkActuate",xLinkArcRole:"xlinkArcrole",xLinkHref:"xlinkHref",xLinkRole:"xlinkRole",xLinkShow:"xlinkShow",xLinkTitle:"xlinkTitle",xLinkType:"xlinkType",xmlnsXLink:"xmlnsXlink"},rr=/[A-Z]/g,Qn=/-[a-z]/g,or=/^data[-\w.:]+$/i;function ir(e,n){const t=hn(n);let a=n,r=Z;if(t in e.normal)return e.property[e.normal[t]];if(t.length>4&&t.slice(0,4)==="data"&&or.test(n)){if(n.charAt(4)==="-"){const o=n.slice(5).replace(Qn,lr);a="data"+o.charAt(0).toUpperCase()+o.slice(1)}else{const o=n.slice(4);if(!Qn.test(o)){let i=o.replace(rr,sr);i.charAt(0)!=="-"&&(i="-"+i),n="data"+i}}r=An}return new r(a,n)}function sr(e){return"-"+e.toLowerCase()}function lr(e){return e.charAt(1).toUpperCase()}const ur=Lt([Ot,nr,Nt,zt,Ft],"html"),In=Lt([Ot,tr,Nt,zt,Ft],"svg");function cr(e){return e.join(" ").trim()}var Se={},tn,Jn;function dr(){if(Jn)return tn;Jn=1;var e=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,n=/\n/g,t=/^\s*/,a=/^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,r=/^:\s*/,o=/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,i=/^[;\s]*/,s=/^\s+|\s+$/g,c=`
`,l="/",u="*",p="",h="comment",d="declaration";tn=function(b,S){if(typeof b!="string")throw new TypeError("First argument must be a string");if(!b)return[];S=S||{};var g=1,T=1;function A(E){var I=E.match(n);I&&(g+=I.length);var L=E.lastIndexOf(c);T=~L?E.length-L:T+E.length}function B(){var E={line:g,column:T};return function(I){return I.position=new U(E),G(),I}}function U(E){this.start=E,this.end={line:g,column:T},this.source=S.source}U.prototype.content=b;function x(E){var I=new Error(S.source+":"+g+":"+T+": "+E);if(I.reason=E,I.filename=S.source,I.line=g,I.column=T,I.source=b,!S.silent)throw I}function N(E){var I=E.exec(b);if(I){var L=I[0];return A(L),b=b.slice(L.length),I}}function G(){N(t)}function F(E){var I;for(E=E||[];I=_();)I!==!1&&E.push(I);return E}function _(){var E=B();if(!(l!=b.charAt(0)||u!=b.charAt(1))){for(var I=2;p!=b.charAt(I)&&(u!=b.charAt(I)||l!=b.charAt(I+1));)++I;if(I+=2,p===b.charAt(I-1))return x("End of comment missing");var L=b.slice(2,I-2);return T+=2,A(L),b=b.slice(I),T+=2,E({type:h,comment:L})}}function R(){var E=B(),I=N(a);if(I){if(_(),!N(r))return x("property missing ':'");var L=N(o),Q=E({type:d,property:v(I[0].replace(e,p)),value:L?v(L[0].replace(e,p)):p});return N(i),Q}}function w(){var E=[];F(E);for(var I;I=R();)I!==!1&&(E.push(I),F(E));return E}return G(),w()};function v(b){return b?b.replace(s,p):p}return tn}var Yn;function pr(){if(Yn)return Se;Yn=1;var e=Se&&Se.__importDefault||function(a){return a&&a.__esModule?a:{default:a}};Object.defineProperty(Se,"__esModule",{value:!0}),Se.default=t;var n=e(dr());function t(a,r){var o=null;if(!a||typeof a!="string")return o;var i=(0,n.default)(a),s=typeof r=="function";return i.forEach(function(c){if(c.type==="declaration"){var l=c.property,u=c.value;s?r(l,u,c):u&&(o=o||{},o[l]=u)}}),o}return Se}var De={},$n;function mr(){if($n)return De;$n=1,Object.defineProperty(De,"__esModule",{value:!0}),De.camelCase=void 0;var e=/^--[a-zA-Z0-9_-]+$/,n=/-([a-z])/g,t=/^[^-]+$/,a=/^-(webkit|moz|ms|o|khtml)-/,r=/^-(ms)-/,o=function(l){return!l||t.test(l)||e.test(l)},i=function(l,u){return u.toUpperCase()},s=function(l,u){return"".concat(u,"-")},c=function(l,u){return u===void 0&&(u={}),o(l)?l:(l=l.toLowerCase(),u.reactCompat?l=l.replace(r,s):l=l.replace(a,s),l.replace(n,i))};return De.camelCase=c,De}var Ne,Xn;function fr(){if(Xn)return Ne;Xn=1;var e=Ne&&Ne.__importDefault||function(r){return r&&r.__esModule?r:{default:r}},n=e(pr()),t=mr();function a(r,o){var i={};return!r||typeof r!="string"||(0,n.default)(r,function(s,c){s&&c&&(i[(0,t.camelCase)(s,o)]=c)}),i}return a.default=a,Ne=a,Ne}var hr=fr();const gr=Rt(hr),Bt=_t("end"),wn=_t("start");function _t(e){return n;function n(t){const a=t&&t.position&&t.position[e]||{};if(typeof a.line=="number"&&a.line>0&&typeof a.column=="number"&&a.column>0)return{line:a.line,column:a.column,offset:typeof a.offset=="number"&&a.offset>-1?a.offset:void 0}}}function yr(e){const n=wn(e),t=Bt(e);if(n&&t)return{start:n,end:t}}function Be(e){return!e||typeof e!="object"?"":"position"in e||"type"in e?Kn(e.position):"start"in e||"end"in e?Kn(e):"line"in e||"column"in e?yn(e):""}function yn(e){return Zn(e&&e.line)+":"+Zn(e&&e.column)}function Kn(e){return yn(e&&e.start)+"-"+yn(e&&e.end)}function Zn(e){return e&&typeof e=="number"?e:1}class $ extends Error{constructor(n,t,a){super(),typeof t=="string"&&(a=t,t=void 0);let r="",o={},i=!1;if(t&&("line"in t&&"column"in t?o={place:t}:"start"in t&&"end"in t?o={place:t}:"type"in t?o={ancestors:[t],place:t.position}:o={...t}),typeof n=="string"?r=n:!o.cause&&n&&(i=!0,r=n.message,o.cause=n),!o.ruleId&&!o.source&&typeof a=="string"){const c=a.indexOf(":");c===-1?o.ruleId=a:(o.source=a.slice(0,c),o.ruleId=a.slice(c+1))}if(!o.place&&o.ancestors&&o.ancestors){const c=o.ancestors[o.ancestors.length-1];c&&(o.place=c.position)}const s=o.place&&"start"in o.place?o.place.start:o.place;this.ancestors=o.ancestors||void 0,this.cause=o.cause||void 0,this.column=s?s.column:void 0,this.fatal=void 0,this.file,this.message=r,this.line=s?s.line:void 0,this.name=Be(o.place)||"1:1",this.place=o.place||void 0,this.reason=this.message,this.ruleId=o.ruleId||void 0,this.source=o.source||void 0,this.stack=i&&o.cause&&typeof o.cause.stack=="string"?o.cause.stack:"",this.actual,this.expected,this.note,this.url}}$.prototype.file="";$.prototype.name="";$.prototype.reason="";$.prototype.message="";$.prototype.stack="";$.prototype.column=void 0;$.prototype.line=void 0;$.prototype.ancestors=void 0;$.prototype.cause=void 0;$.prototype.fatal=void 0;$.prototype.place=void 0;$.prototype.ruleId=void 0;$.prototype.source=void 0;const En={}.hasOwnProperty,br=new Map,xr=/[A-Z]/g,vr=new Set(["table","tbody","thead","tfoot","tr"]),Cr=new Set(["td","th"]),jt="https://github.com/syntax-tree/hast-util-to-jsx-runtime";function kr(e,n){if(!n||n.Fragment===void 0)throw new TypeError("Expected `Fragment` in options");const t=n.filePath||void 0;let a;if(n.development){if(typeof n.jsxDEV!="function")throw new TypeError("Expected `jsxDEV` in options when `development: true`");a=Mr(t,n.jsxDEV)}else{if(typeof n.jsx!="function")throw new TypeError("Expected `jsx` in production options");if(typeof n.jsxs!="function")throw new TypeError("Expected `jsxs` in production options");a=Rr(t,n.jsx,n.jsxs)}const r={Fragment:n.Fragment,ancestors:[],components:n.components||{},create:a,elementAttributeNameCase:n.elementAttributeNameCase||"react",evaluater:n.createEvaluater?n.createEvaluater():void 0,filePath:t,ignoreInvalidStyle:n.ignoreInvalidStyle||!1,passKeys:n.passKeys!==!1,passNode:n.passNode||!1,schema:n.space==="svg"?In:ur,stylePropertyNameCase:n.stylePropertyNameCase||"dom",tableCellAlignToStyle:n.tableCellAlignToStyle!==!1},o=Ut(r,e,void 0);return o&&typeof o!="string"?o:r.create(e,r.Fragment,{children:o||void 0},void 0)}function Ut(e,n,t){if(n.type==="element")return Tr(e,n,t);if(n.type==="mdxFlowExpression"||n.type==="mdxTextExpression")return Sr(e,n);if(n.type==="mdxJsxFlowElement"||n.type==="mdxJsxTextElement")return Ir(e,n,t);if(n.type==="mdxjsEsm")return Ar(e,n);if(n.type==="root")return wr(e,n,t);if(n.type==="text")return Er(e,n)}function Tr(e,n,t){const a=e.schema;let r=a;n.tagName.toLowerCase()==="svg"&&a.space==="html"&&(r=In,e.schema=r),e.ancestors.push(n);const o=Ht(e,n.tagName,!1),i=Lr(e,n);let s=Mn(e,n);return vr.has(n.tagName)&&(s=s.filter(function(c){return typeof c=="string"?!Za(c):!0})),Vt(e,i,o,n),Rn(i,s),e.ancestors.pop(),e.schema=a,e.create(n,o,i,t)}function Sr(e,n){if(n.data&&n.data.estree&&e.evaluater){const a=n.data.estree.body[0];return a.type,e.evaluater.evaluateExpression(a.expression)}Ue(e,n.position)}function Ar(e,n){if(n.data&&n.data.estree&&e.evaluater)return e.evaluater.evaluateProgram(n.data.estree);Ue(e,n.position)}function Ir(e,n,t){const a=e.schema;let r=a;n.name==="svg"&&a.space==="html"&&(r=In,e.schema=r),e.ancestors.push(n);const o=n.name===null?e.Fragment:Ht(e,n.name,!0),i=Pr(e,n),s=Mn(e,n);return Vt(e,i,o,n),Rn(i,s),e.ancestors.pop(),e.schema=a,e.create(n,o,i,t)}function wr(e,n,t){const a={};return Rn(a,Mn(e,n)),e.create(n,e.Fragment,a,t)}function Er(e,n){return n.value}function Vt(e,n,t,a){typeof t!="string"&&t!==e.Fragment&&e.passNode&&(n.node=a)}function Rn(e,n){if(n.length>0){const t=n.length>1?n:n[0];t&&(e.children=t)}}function Rr(e,n,t){return a;function a(r,o,i,s){const l=Array.isArray(i.children)?t:n;return s?l(o,i,s):l(o,i)}}function Mr(e,n){return t;function t(a,r,o,i){const s=Array.isArray(o.children),c=wn(a);return n(r,o,i,s,{columnNumber:c?c.column-1:void 0,fileName:e,lineNumber:c?c.line:void 0},void 0)}}function Lr(e,n){const t={};let a,r;for(r in n.properties)if(r!=="children"&&En.call(n.properties,r)){const o=Or(e,r,n.properties[r]);if(o){const[i,s]=o;e.tableCellAlignToStyle&&i==="align"&&typeof s=="string"&&Cr.has(n.tagName)?a=s:t[i]=s}}if(a){const o=t.style||(t.style={});o[e.stylePropertyNameCase==="css"?"text-align":"textAlign"]=a}return t}function Pr(e,n){const t={};for(const a of n.attributes)if(a.type==="mdxJsxExpressionAttribute")if(a.data&&a.data.estree&&e.evaluater){const o=a.data.estree.body[0];o.type;const i=o.expression;i.type;const s=i.properties[0];s.type,Object.assign(t,e.evaluater.evaluateExpression(s.argument))}else Ue(e,n.position);else{const r=a.name;let o;if(a.value&&typeof a.value=="object")if(a.value.data&&a.value.data.estree&&e.evaluater){const s=a.value.data.estree.body[0];s.type,o=e.evaluater.evaluateExpression(s.expression)}else Ue(e,n.position);else o=a.value===null?!0:a.value;t[r]=o}return t}function Mn(e,n){const t=[];let a=-1;const r=e.passKeys?new Map:br;for(;++a<n.children.length;){const o=n.children[a];let i;if(e.passKeys){const c=o.type==="element"?o.tagName:o.type==="mdxJsxFlowElement"||o.type==="mdxJsxTextElement"?o.name:void 0;if(c){const l=r.get(c)||0;i=c+"-"+l,r.set(c,l+1)}}const s=Ut(e,o,i);s!==void 0&&t.push(s)}return t}function Or(e,n,t){const a=ir(e.schema,n);if(!(t==null||typeof t=="number"&&Number.isNaN(t))){if(Array.isArray(t)&&(t=a.commaSeparated?Ja(t):cr(t)),a.property==="style"){let r=typeof t=="object"?t:qr(e,String(t));return e.stylePropertyNameCase==="css"&&(r=Dr(r)),["style",r]}return[e.elementAttributeNameCase==="react"&&a.space?ar[a.property]||a.property:a.attribute,t]}}function qr(e,n){try{return gr(n,{reactCompat:!0})}catch(t){if(e.ignoreInvalidStyle)return{};const a=t,r=new $("Cannot parse `style` attribute",{ancestors:e.ancestors,cause:a,ruleId:"style",source:"hast-util-to-jsx-runtime"});throw r.file=e.filePath||void 0,r.url=jt+"#cannot-parse-style-attribute",r}}function Ht(e,n,t){let a;if(!t)a={type:"Literal",value:n};else if(n.includes(".")){const r=n.split(".");let o=-1,i;for(;++o<r.length;){const s=Hn(r[o])?{type:"Identifier",name:r[o]}:{type:"Literal",value:r[o]};i=i?{type:"MemberExpression",object:i,property:s,computed:!!(o&&s.type==="Literal"),optional:!1}:s}a=i}else a=Hn(n)&&!/^[a-z]/.test(n)?{type:"Identifier",name:n}:{type:"Literal",value:n};if(a.type==="Literal"){const r=a.value;return En.call(e.components,r)?e.components[r]:r}if(e.evaluater)return e.evaluater.evaluateExpression(a);Ue(e)}function Ue(e,n){const t=new $("Cannot handle MDX estrees without `createEvaluater`",{ancestors:e.ancestors,place:n,ruleId:"mdx-estree",source:"hast-util-to-jsx-runtime"});throw t.file=e.filePath||void 0,t.url=jt+"#cannot-handle-mdx-estrees-without-createevaluater",t}function Dr(e){const n={};let t;for(t in e)En.call(e,t)&&(n[Nr(t)]=e[t]);return n}function Nr(e){let n=e.replace(xr,zr);return n.slice(0,3)==="ms-"&&(n="-"+n),n}function zr(e){return"-"+e.toLowerCase()}const an={action:["form"],cite:["blockquote","del","ins","q"],data:["object"],formAction:["button","input"],href:["a","area","base","link"],icon:["menuitem"],itemId:null,manifest:["html"],ping:["a","area"],poster:["video"],src:["audio","embed","iframe","img","input","script","source","track","video"]},Fr={};function Br(e,n){const t=Fr,a=typeof t.includeImageAlt=="boolean"?t.includeImageAlt:!0,r=typeof t.includeHtml=="boolean"?t.includeHtml:!0;return Gt(e,a,r)}function Gt(e,n,t){if(_r(e)){if("value"in e)return e.type==="html"&&!t?"":e.value;if(n&&"alt"in e&&e.alt)return e.alt;if("children"in e)return et(e.children,n,t)}return Array.isArray(e)?et(e,n,t):""}function et(e,n,t){const a=[];let r=-1;for(;++r<e.length;)a[r]=Gt(e[r],n,t);return a.join("")}function _r(e){return!!(e&&typeof e=="object")}const nt=document.createElement("i");function Ln(e){const n="&"+e+";";nt.innerHTML=n;const t=nt.textContent;return t.charCodeAt(t.length-1)===59&&e!=="semi"||t===n?!1:t}function ce(e,n,t,a){const r=e.length;let o=0,i;if(n<0?n=-n>r?0:r+n:n=n>r?r:n,t=t>0?t:0,a.length<1e4)i=Array.from(a),i.unshift(n,t),e.splice(...i);else for(t&&e.splice(n,t);o<a.length;)i=a.slice(o,o+1e4),i.unshift(n,0),e.splice(...i),o+=1e4,n+=1e4}function ae(e,n){return e.length>0?(ce(e,e.length,0,n),e):n}const tt={}.hasOwnProperty;function jr(e){const n={};let t=-1;for(;++t<e.length;)Ur(n,e[t]);return n}function Ur(e,n){let t;for(t in n){const r=(tt.call(e,t)?e[t]:void 0)||(e[t]={}),o=n[t];let i;if(o)for(i in o){tt.call(r,i)||(r[i]=[]);const s=o[i];Vr(r[i],Array.isArray(s)?s:s?[s]:[])}}}function Vr(e,n){let t=-1;const a=[];for(;++t<n.length;)(n[t].add==="after"?e:a).push(n[t]);ce(e,0,0,a)}function Wt(e,n){const t=Number.parseInt(e,n);return t<9||t===11||t>13&&t<32||t>126&&t<160||t>55295&&t<57344||t>64975&&t<65008||(t&65535)===65535||(t&65535)===65534||t>1114111?"�":String.fromCodePoint(t)}function we(e){return e.replace(/[\t\n\r ]+/g," ").replace(/^ | $/g,"").toLowerCase().toUpperCase()}const ue=ye(/[A-Za-z]/),te=ye(/[\dA-Za-z]/),Hr=ye(/[#-'*+\--9=?A-Z^-~]/);function bn(e){return e!==null&&(e<32||e===127)}const xn=ye(/\d/),Gr=ye(/[\dA-Fa-f]/),Wr=ye(/[!-/:-@[-`{-~]/);function M(e){return e!==null&&e<-2}function K(e){return e!==null&&(e<0||e===32)}function z(e){return e===-2||e===-1||e===32}const Qr=ye(new RegExp("\\p{P}|\\p{S}","u")),Jr=ye(/\s/);function ye(e){return n;function n(t){return t!==null&&t>-1&&e.test(String.fromCharCode(t))}}function Re(e){const n=[];let t=-1,a=0,r=0;for(;++t<e.length;){const o=e.charCodeAt(t);let i="";if(o===37&&te(e.charCodeAt(t+1))&&te(e.charCodeAt(t+2)))r=2;else if(o<128)/[!#$&-;=?-Z_a-z~]/.test(String.fromCharCode(o))||(i=String.fromCharCode(o));else if(o>55295&&o<57344){const s=e.charCodeAt(t+1);o<56320&&s>56319&&s<57344?(i=String.fromCharCode(o,s),r=1):i="�"}else i=String.fromCharCode(o);i&&(n.push(e.slice(a,t),encodeURIComponent(i)),a=t+r+1,i=""),r&&(t+=r,r=0)}return n.join("")+e.slice(a)}function H(e,n,t,a){const r=a?a-1:Number.POSITIVE_INFINITY;let o=0;return i;function i(c){return z(c)?(e.enter(t),s(c)):n(c)}function s(c){return z(c)&&o++<r?(e.consume(c),s):(e.exit(t),n(c))}}const Yr={tokenize:$r};function $r(e){const n=e.attempt(this.parser.constructs.contentInitial,a,r);let t;return n;function a(s){if(s===null){e.consume(s);return}return e.enter("lineEnding"),e.consume(s),e.exit("lineEnding"),H(e,n,"linePrefix")}function r(s){return e.enter("paragraph"),o(s)}function o(s){const c=e.enter("chunkText",{contentType:"text",previous:t});return t&&(t.next=c),t=c,i(s)}function i(s){if(s===null){e.exit("chunkText"),e.exit("paragraph"),e.consume(s);return}return M(s)?(e.consume(s),e.exit("chunkText"),o):(e.consume(s),i)}}const Xr={tokenize:Kr},at={tokenize:Zr};function Kr(e){const n=this,t=[];let a=0,r,o,i;return s;function s(A){if(a<t.length){const B=t[a];return n.containerState=B[1],e.attempt(B[0].continuation,c,l)(A)}return l(A)}function c(A){if(a++,n.containerState._closeFlow){n.containerState._closeFlow=void 0,r&&T();const B=n.events.length;let U=B,x;for(;U--;)if(n.events[U][0]==="exit"&&n.events[U][1].type==="chunkFlow"){x=n.events[U][1].end;break}g(a);let N=B;for(;N<n.events.length;)n.events[N][1].end={...x},N++;return ce(n.events,U+1,0,n.events.slice(B)),n.events.length=N,l(A)}return s(A)}function l(A){if(a===t.length){if(!r)return h(A);if(r.currentConstruct&&r.currentConstruct.concrete)return v(A);n.interrupt=!!(r.currentConstruct&&!r._gfmTableDynamicInterruptHack)}return n.containerState={},e.check(at,u,p)(A)}function u(A){return r&&T(),g(a),h(A)}function p(A){return n.parser.lazy[n.now().line]=a!==t.length,i=n.now().offset,v(A)}function h(A){return n.containerState={},e.attempt(at,d,v)(A)}function d(A){return a++,t.push([n.currentConstruct,n.containerState]),h(A)}function v(A){if(A===null){r&&T(),g(0),e.consume(A);return}return r=r||n.parser.flow(n.now()),e.enter("chunkFlow",{_tokenizer:r,contentType:"flow",previous:o}),b(A)}function b(A){if(A===null){S(e.exit("chunkFlow"),!0),g(0),e.consume(A);return}return M(A)?(e.consume(A),S(e.exit("chunkFlow")),a=0,n.interrupt=void 0,s):(e.consume(A),b)}function S(A,B){const U=n.sliceStream(A);if(B&&U.push(null),A.previous=o,o&&(o.next=A),o=A,r.defineSkip(A.start),r.write(U),n.parser.lazy[A.start.line]){let x=r.events.length;for(;x--;)if(r.events[x][1].start.offset<i&&(!r.events[x][1].end||r.events[x][1].end.offset>i))return;const N=n.events.length;let G=N,F,_;for(;G--;)if(n.events[G][0]==="exit"&&n.events[G][1].type==="chunkFlow"){if(F){_=n.events[G][1].end;break}F=!0}for(g(a),x=N;x<n.events.length;)n.events[x][1].end={..._},x++;ce(n.events,G+1,0,n.events.slice(N)),n.events.length=x}}function g(A){let B=t.length;for(;B-- >A;){const U=t[B];n.containerState=U[1],U[0].exit.call(n,e)}t.length=A}function T(){r.write([null]),o=void 0,r=void 0,n.containerState._closeFlow=void 0}}function Zr(e,n,t){return H(e,e.attempt(this.parser.constructs.document,n,t),"linePrefix",this.parser.constructs.disable.null.includes("codeIndented")?void 0:4)}function rt(e){if(e===null||K(e)||Jr(e))return 1;if(Qr(e))return 2}function Pn(e,n,t){const a=[];let r=-1;for(;++r<e.length;){const o=e[r].resolveAll;o&&!a.includes(o)&&(n=o(n,t),a.push(o))}return n}const vn={name:"attention",resolveAll:eo,tokenize:no};function eo(e,n){let t=-1,a,r,o,i,s,c,l,u;for(;++t<e.length;)if(e[t][0]==="enter"&&e[t][1].type==="attentionSequence"&&e[t][1]._close){for(a=t;a--;)if(e[a][0]==="exit"&&e[a][1].type==="attentionSequence"&&e[a][1]._open&&n.sliceSerialize(e[a][1]).charCodeAt(0)===n.sliceSerialize(e[t][1]).charCodeAt(0)){if((e[a][1]._close||e[t][1]._open)&&(e[t][1].end.offset-e[t][1].start.offset)%3&&!((e[a][1].end.offset-e[a][1].start.offset+e[t][1].end.offset-e[t][1].start.offset)%3))continue;c=e[a][1].end.offset-e[a][1].start.offset>1&&e[t][1].end.offset-e[t][1].start.offset>1?2:1;const p={...e[a][1].end},h={...e[t][1].start};ot(p,-c),ot(h,c),i={type:c>1?"strongSequence":"emphasisSequence",start:p,end:{...e[a][1].end}},s={type:c>1?"strongSequence":"emphasisSequence",start:{...e[t][1].start},end:h},o={type:c>1?"strongText":"emphasisText",start:{...e[a][1].end},end:{...e[t][1].start}},r={type:c>1?"strong":"emphasis",start:{...i.start},end:{...s.end}},e[a][1].end={...i.start},e[t][1].start={...s.end},l=[],e[a][1].end.offset-e[a][1].start.offset&&(l=ae(l,[["enter",e[a][1],n],["exit",e[a][1],n]])),l=ae(l,[["enter",r,n],["enter",i,n],["exit",i,n],["enter",o,n]]),l=ae(l,Pn(n.parser.constructs.insideSpan.null,e.slice(a+1,t),n)),l=ae(l,[["exit",o,n],["enter",s,n],["exit",s,n],["exit",r,n]]),e[t][1].end.offset-e[t][1].start.offset?(u=2,l=ae(l,[["enter",e[t][1],n],["exit",e[t][1],n]])):u=0,ce(e,a-1,t-a+3,l),t=a+l.length-u-2;break}}for(t=-1;++t<e.length;)e[t][1].type==="attentionSequence"&&(e[t][1].type="data");return e}function no(e,n){const t=this.parser.constructs.attentionMarkers.null,a=this.previous,r=rt(a);let o;return i;function i(c){return o=c,e.enter("attentionSequence"),s(c)}function s(c){if(c===o)return e.consume(c),s;const l=e.exit("attentionSequence"),u=rt(c),p=!u||u===2&&r||t.includes(c),h=!r||r===2&&u||t.includes(a);return l._open=!!(o===42?p:p&&(r||!h)),l._close=!!(o===42?h:h&&(u||!p)),n(c)}}function ot(e,n){e.column+=n,e.offset+=n,e._bufferIndex+=n}const to={name:"autolink",tokenize:ao};function ao(e,n,t){let a=0;return r;function r(d){return e.enter("autolink"),e.enter("autolinkMarker"),e.consume(d),e.exit("autolinkMarker"),e.enter("autolinkProtocol"),o}function o(d){return ue(d)?(e.consume(d),i):d===64?t(d):l(d)}function i(d){return d===43||d===45||d===46||te(d)?(a=1,s(d)):l(d)}function s(d){return d===58?(e.consume(d),a=0,c):(d===43||d===45||d===46||te(d))&&a++<32?(e.consume(d),s):(a=0,l(d))}function c(d){return d===62?(e.exit("autolinkProtocol"),e.enter("autolinkMarker"),e.consume(d),e.exit("autolinkMarker"),e.exit("autolink"),n):d===null||d===32||d===60||bn(d)?t(d):(e.consume(d),c)}function l(d){return d===64?(e.consume(d),u):Hr(d)?(e.consume(d),l):t(d)}function u(d){return te(d)?p(d):t(d)}function p(d){return d===46?(e.consume(d),a=0,u):d===62?(e.exit("autolinkProtocol").type="autolinkEmail",e.enter("autolinkMarker"),e.consume(d),e.exit("autolinkMarker"),e.exit("autolink"),n):h(d)}function h(d){if((d===45||te(d))&&a++<63){const v=d===45?h:p;return e.consume(d),v}return t(d)}}const Ke={partial:!0,tokenize:ro};function ro(e,n,t){return a;function a(o){return z(o)?H(e,r,"linePrefix")(o):r(o)}function r(o){return o===null||M(o)?n(o):t(o)}}const Qt={continuation:{tokenize:io},exit:so,name:"blockQuote",tokenize:oo};function oo(e,n,t){const a=this;return r;function r(i){if(i===62){const s=a.containerState;return s.open||(e.enter("blockQuote",{_container:!0}),s.open=!0),e.enter("blockQuotePrefix"),e.enter("blockQuoteMarker"),e.consume(i),e.exit("blockQuoteMarker"),o}return t(i)}function o(i){return z(i)?(e.enter("blockQuotePrefixWhitespace"),e.consume(i),e.exit("blockQuotePrefixWhitespace"),e.exit("blockQuotePrefix"),n):(e.exit("blockQuotePrefix"),n(i))}}function io(e,n,t){const a=this;return r;function r(i){return z(i)?H(e,o,"linePrefix",a.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(i):o(i)}function o(i){return e.attempt(Qt,n,t)(i)}}function so(e){e.exit("blockQuote")}const Jt={name:"characterEscape",tokenize:lo};function lo(e,n,t){return a;function a(o){return e.enter("characterEscape"),e.enter("escapeMarker"),e.consume(o),e.exit("escapeMarker"),r}function r(o){return Wr(o)?(e.enter("characterEscapeValue"),e.consume(o),e.exit("characterEscapeValue"),e.exit("characterEscape"),n):t(o)}}const Yt={name:"characterReference",tokenize:uo};function uo(e,n,t){const a=this;let r=0,o,i;return s;function s(p){return e.enter("characterReference"),e.enter("characterReferenceMarker"),e.consume(p),e.exit("characterReferenceMarker"),c}function c(p){return p===35?(e.enter("characterReferenceMarkerNumeric"),e.consume(p),e.exit("characterReferenceMarkerNumeric"),l):(e.enter("characterReferenceValue"),o=31,i=te,u(p))}function l(p){return p===88||p===120?(e.enter("characterReferenceMarkerHexadecimal"),e.consume(p),e.exit("characterReferenceMarkerHexadecimal"),e.enter("characterReferenceValue"),o=6,i=Gr,u):(e.enter("characterReferenceValue"),o=7,i=xn,u(p))}function u(p){if(p===59&&r){const h=e.exit("characterReferenceValue");return i===te&&!Ln(a.sliceSerialize(h))?t(p):(e.enter("characterReferenceMarker"),e.consume(p),e.exit("characterReferenceMarker"),e.exit("characterReference"),n)}return i(p)&&r++<o?(e.consume(p),u):t(p)}}const it={partial:!0,tokenize:po},st={concrete:!0,name:"codeFenced",tokenize:co};function co(e,n,t){const a=this,r={partial:!0,tokenize:U};let o=0,i=0,s;return c;function c(x){return l(x)}function l(x){const N=a.events[a.events.length-1];return o=N&&N[1].type==="linePrefix"?N[2].sliceSerialize(N[1],!0).length:0,s=x,e.enter("codeFenced"),e.enter("codeFencedFence"),e.enter("codeFencedFenceSequence"),u(x)}function u(x){return x===s?(i++,e.consume(x),u):i<3?t(x):(e.exit("codeFencedFenceSequence"),z(x)?H(e,p,"whitespace")(x):p(x))}function p(x){return x===null||M(x)?(e.exit("codeFencedFence"),a.interrupt?n(x):e.check(it,b,B)(x)):(e.enter("codeFencedFenceInfo"),e.enter("chunkString",{contentType:"string"}),h(x))}function h(x){return x===null||M(x)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),p(x)):z(x)?(e.exit("chunkString"),e.exit("codeFencedFenceInfo"),H(e,d,"whitespace")(x)):x===96&&x===s?t(x):(e.consume(x),h)}function d(x){return x===null||M(x)?p(x):(e.enter("codeFencedFenceMeta"),e.enter("chunkString",{contentType:"string"}),v(x))}function v(x){return x===null||M(x)?(e.exit("chunkString"),e.exit("codeFencedFenceMeta"),p(x)):x===96&&x===s?t(x):(e.consume(x),v)}function b(x){return e.attempt(r,B,S)(x)}function S(x){return e.enter("lineEnding"),e.consume(x),e.exit("lineEnding"),g}function g(x){return o>0&&z(x)?H(e,T,"linePrefix",o+1)(x):T(x)}function T(x){return x===null||M(x)?e.check(it,b,B)(x):(e.enter("codeFlowValue"),A(x))}function A(x){return x===null||M(x)?(e.exit("codeFlowValue"),T(x)):(e.consume(x),A)}function B(x){return e.exit("codeFenced"),n(x)}function U(x,N,G){let F=0;return _;function _(L){return x.enter("lineEnding"),x.consume(L),x.exit("lineEnding"),R}function R(L){return x.enter("codeFencedFence"),z(L)?H(x,w,"linePrefix",a.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(L):w(L)}function w(L){return L===s?(x.enter("codeFencedFenceSequence"),E(L)):G(L)}function E(L){return L===s?(F++,x.consume(L),E):F>=i?(x.exit("codeFencedFenceSequence"),z(L)?H(x,I,"whitespace")(L):I(L)):G(L)}function I(L){return L===null||M(L)?(x.exit("codeFencedFence"),N(L)):G(L)}}}function po(e,n,t){const a=this;return r;function r(i){return i===null?t(i):(e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),o)}function o(i){return a.parser.lazy[a.now().line]?t(i):n(i)}}const rn={name:"codeIndented",tokenize:fo},mo={partial:!0,tokenize:ho};function fo(e,n,t){const a=this;return r;function r(l){return e.enter("codeIndented"),H(e,o,"linePrefix",5)(l)}function o(l){const u=a.events[a.events.length-1];return u&&u[1].type==="linePrefix"&&u[2].sliceSerialize(u[1],!0).length>=4?i(l):t(l)}function i(l){return l===null?c(l):M(l)?e.attempt(mo,i,c)(l):(e.enter("codeFlowValue"),s(l))}function s(l){return l===null||M(l)?(e.exit("codeFlowValue"),i(l)):(e.consume(l),s)}function c(l){return e.exit("codeIndented"),n(l)}}function ho(e,n,t){const a=this;return r;function r(i){return a.parser.lazy[a.now().line]?t(i):M(i)?(e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),r):H(e,o,"linePrefix",5)(i)}function o(i){const s=a.events[a.events.length-1];return s&&s[1].type==="linePrefix"&&s[2].sliceSerialize(s[1],!0).length>=4?n(i):M(i)?r(i):t(i)}}const go={name:"codeText",previous:bo,resolve:yo,tokenize:xo};function yo(e){let n=e.length-4,t=3,a,r;if((e[t][1].type==="lineEnding"||e[t][1].type==="space")&&(e[n][1].type==="lineEnding"||e[n][1].type==="space")){for(a=t;++a<n;)if(e[a][1].type==="codeTextData"){e[t][1].type="codeTextPadding",e[n][1].type="codeTextPadding",t+=2,n-=2;break}}for(a=t-1,n++;++a<=n;)r===void 0?a!==n&&e[a][1].type!=="lineEnding"&&(r=a):(a===n||e[a][1].type==="lineEnding")&&(e[r][1].type="codeTextData",a!==r+2&&(e[r][1].end=e[a-1][1].end,e.splice(r+2,a-r-2),n-=a-r-2,a=r+2),r=void 0);return e}function bo(e){return e!==96||this.events[this.events.length-1][1].type==="characterEscape"}function xo(e,n,t){let a=0,r,o;return i;function i(p){return e.enter("codeText"),e.enter("codeTextSequence"),s(p)}function s(p){return p===96?(e.consume(p),a++,s):(e.exit("codeTextSequence"),c(p))}function c(p){return p===null?t(p):p===32?(e.enter("space"),e.consume(p),e.exit("space"),c):p===96?(o=e.enter("codeTextSequence"),r=0,u(p)):M(p)?(e.enter("lineEnding"),e.consume(p),e.exit("lineEnding"),c):(e.enter("codeTextData"),l(p))}function l(p){return p===null||p===32||p===96||M(p)?(e.exit("codeTextData"),c(p)):(e.consume(p),l)}function u(p){return p===96?(e.consume(p),r++,u):r===a?(e.exit("codeTextSequence"),e.exit("codeText"),n(p)):(o.type="codeTextData",l(p))}}class vo{constructor(n){this.left=n?[...n]:[],this.right=[]}get(n){if(n<0||n>=this.left.length+this.right.length)throw new RangeError("Cannot access index `"+n+"` in a splice buffer of size `"+(this.left.length+this.right.length)+"`");return n<this.left.length?this.left[n]:this.right[this.right.length-n+this.left.length-1]}get length(){return this.left.length+this.right.length}shift(){return this.setCursor(0),this.right.pop()}slice(n,t){const a=t??Number.POSITIVE_INFINITY;return a<this.left.length?this.left.slice(n,a):n>this.left.length?this.right.slice(this.right.length-a+this.left.length,this.right.length-n+this.left.length).reverse():this.left.slice(n).concat(this.right.slice(this.right.length-a+this.left.length).reverse())}splice(n,t,a){const r=t||0;this.setCursor(Math.trunc(n));const o=this.right.splice(this.right.length-r,Number.POSITIVE_INFINITY);return a&&ze(this.left,a),o.reverse()}pop(){return this.setCursor(Number.POSITIVE_INFINITY),this.left.pop()}push(n){this.setCursor(Number.POSITIVE_INFINITY),this.left.push(n)}pushMany(n){this.setCursor(Number.POSITIVE_INFINITY),ze(this.left,n)}unshift(n){this.setCursor(0),this.right.push(n)}unshiftMany(n){this.setCursor(0),ze(this.right,n.reverse())}setCursor(n){if(!(n===this.left.length||n>this.left.length&&this.right.length===0||n<0&&this.left.length===0))if(n<this.left.length){const t=this.left.splice(n,Number.POSITIVE_INFINITY);ze(this.right,t.reverse())}else{const t=this.right.splice(this.left.length+this.right.length-n,Number.POSITIVE_INFINITY);ze(this.left,t.reverse())}}}function ze(e,n){let t=0;if(n.length<1e4)e.push(...n);else for(;t<n.length;)e.push(...n.slice(t,t+1e4)),t+=1e4}function $t(e){const n={};let t=-1,a,r,o,i,s,c,l;const u=new vo(e);for(;++t<u.length;){for(;t in n;)t=n[t];if(a=u.get(t),t&&a[1].type==="chunkFlow"&&u.get(t-1)[1].type==="listItemPrefix"&&(c=a[1]._tokenizer.events,o=0,o<c.length&&c[o][1].type==="lineEndingBlank"&&(o+=2),o<c.length&&c[o][1].type==="content"))for(;++o<c.length&&c[o][1].type!=="content";)c[o][1].type==="chunkText"&&(c[o][1]._isInFirstContentOfListItem=!0,o++);if(a[0]==="enter")a[1].contentType&&(Object.assign(n,Co(u,t)),t=n[t],l=!0);else if(a[1]._container){for(o=t,r=void 0;o--;)if(i=u.get(o),i[1].type==="lineEnding"||i[1].type==="lineEndingBlank")i[0]==="enter"&&(r&&(u.get(r)[1].type="lineEndingBlank"),i[1].type="lineEnding",r=o);else if(!(i[1].type==="linePrefix"||i[1].type==="listItemIndent"))break;r&&(a[1].end={...u.get(r)[1].start},s=u.slice(r,t),s.unshift(a),u.splice(r,t-r+1,s))}}return ce(e,0,Number.POSITIVE_INFINITY,u.slice(0)),!l}function Co(e,n){const t=e.get(n)[1],a=e.get(n)[2];let r=n-1;const o=[];let i=t._tokenizer;i||(i=a.parser[t.contentType](t.start),t._contentTypeTextTrailing&&(i._contentTypeTextTrailing=!0));const s=i.events,c=[],l={};let u,p,h=-1,d=t,v=0,b=0;const S=[b];for(;d;){for(;e.get(++r)[1]!==d;);o.push(r),d._tokenizer||(u=a.sliceStream(d),d.next||u.push(null),p&&i.defineSkip(d.start),d._isInFirstContentOfListItem&&(i._gfmTasklistFirstContentOfListItem=!0),i.write(u),d._isInFirstContentOfListItem&&(i._gfmTasklistFirstContentOfListItem=void 0)),p=d,d=d.next}for(d=t;++h<s.length;)s[h][0]==="exit"&&s[h-1][0]==="enter"&&s[h][1].type===s[h-1][1].type&&s[h][1].start.line!==s[h][1].end.line&&(b=h+1,S.push(b),d._tokenizer=void 0,d.previous=void 0,d=d.next);for(i.events=[],d?(d._tokenizer=void 0,d.previous=void 0):S.pop(),h=S.length;h--;){const g=s.slice(S[h],S[h+1]),T=o.pop();c.push([T,T+g.length-1]),e.splice(T,2,g)}for(c.reverse(),h=-1;++h<c.length;)l[v+c[h][0]]=v+c[h][1],v+=c[h][1]-c[h][0]-1;return l}const ko={resolve:So,tokenize:Ao},To={partial:!0,tokenize:Io};function So(e){return $t(e),e}function Ao(e,n){let t;return a;function a(s){return e.enter("content"),t=e.enter("chunkContent",{contentType:"content"}),r(s)}function r(s){return s===null?o(s):M(s)?e.check(To,i,o)(s):(e.consume(s),r)}function o(s){return e.exit("chunkContent"),e.exit("content"),n(s)}function i(s){return e.consume(s),e.exit("chunkContent"),t.next=e.enter("chunkContent",{contentType:"content",previous:t}),t=t.next,r}}function Io(e,n,t){const a=this;return r;function r(i){return e.exit("chunkContent"),e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),H(e,o,"linePrefix")}function o(i){if(i===null||M(i))return t(i);const s=a.events[a.events.length-1];return!a.parser.constructs.disable.null.includes("codeIndented")&&s&&s[1].type==="linePrefix"&&s[2].sliceSerialize(s[1],!0).length>=4?n(i):e.interrupt(a.parser.constructs.flow,t,n)(i)}}function Xt(e,n,t,a,r,o,i,s,c){const l=c||Number.POSITIVE_INFINITY;let u=0;return p;function p(g){return g===60?(e.enter(a),e.enter(r),e.enter(o),e.consume(g),e.exit(o),h):g===null||g===32||g===41||bn(g)?t(g):(e.enter(a),e.enter(i),e.enter(s),e.enter("chunkString",{contentType:"string"}),b(g))}function h(g){return g===62?(e.enter(o),e.consume(g),e.exit(o),e.exit(r),e.exit(a),n):(e.enter(s),e.enter("chunkString",{contentType:"string"}),d(g))}function d(g){return g===62?(e.exit("chunkString"),e.exit(s),h(g)):g===null||g===60||M(g)?t(g):(e.consume(g),g===92?v:d)}function v(g){return g===60||g===62||g===92?(e.consume(g),d):d(g)}function b(g){return!u&&(g===null||g===41||K(g))?(e.exit("chunkString"),e.exit(s),e.exit(i),e.exit(a),n(g)):u<l&&g===40?(e.consume(g),u++,b):g===41?(e.consume(g),u--,b):g===null||g===32||g===40||bn(g)?t(g):(e.consume(g),g===92?S:b)}function S(g){return g===40||g===41||g===92?(e.consume(g),b):b(g)}}function Kt(e,n,t,a,r,o){const i=this;let s=0,c;return l;function l(d){return e.enter(a),e.enter(r),e.consume(d),e.exit(r),e.enter(o),u}function u(d){return s>999||d===null||d===91||d===93&&!c||d===94&&!s&&"_hiddenFootnoteSupport"in i.parser.constructs?t(d):d===93?(e.exit(o),e.enter(r),e.consume(d),e.exit(r),e.exit(a),n):M(d)?(e.enter("lineEnding"),e.consume(d),e.exit("lineEnding"),u):(e.enter("chunkString",{contentType:"string"}),p(d))}function p(d){return d===null||d===91||d===93||M(d)||s++>999?(e.exit("chunkString"),u(d)):(e.consume(d),c||(c=!z(d)),d===92?h:p)}function h(d){return d===91||d===92||d===93?(e.consume(d),s++,p):p(d)}}function Zt(e,n,t,a,r,o){let i;return s;function s(h){return h===34||h===39||h===40?(e.enter(a),e.enter(r),e.consume(h),e.exit(r),i=h===40?41:h,c):t(h)}function c(h){return h===i?(e.enter(r),e.consume(h),e.exit(r),e.exit(a),n):(e.enter(o),l(h))}function l(h){return h===i?(e.exit(o),c(i)):h===null?t(h):M(h)?(e.enter("lineEnding"),e.consume(h),e.exit("lineEnding"),H(e,l,"linePrefix")):(e.enter("chunkString",{contentType:"string"}),u(h))}function u(h){return h===i||h===null||M(h)?(e.exit("chunkString"),l(h)):(e.consume(h),h===92?p:u)}function p(h){return h===i||h===92?(e.consume(h),u):u(h)}}function _e(e,n){let t;return a;function a(r){return M(r)?(e.enter("lineEnding"),e.consume(r),e.exit("lineEnding"),t=!0,a):z(r)?H(e,a,t?"linePrefix":"lineSuffix")(r):n(r)}}const wo={name:"definition",tokenize:Ro},Eo={partial:!0,tokenize:Mo};function Ro(e,n,t){const a=this;let r;return o;function o(d){return e.enter("definition"),i(d)}function i(d){return Kt.call(a,e,s,t,"definitionLabel","definitionLabelMarker","definitionLabelString")(d)}function s(d){return r=we(a.sliceSerialize(a.events[a.events.length-1][1]).slice(1,-1)),d===58?(e.enter("definitionMarker"),e.consume(d),e.exit("definitionMarker"),c):t(d)}function c(d){return K(d)?_e(e,l)(d):l(d)}function l(d){return Xt(e,u,t,"definitionDestination","definitionDestinationLiteral","definitionDestinationLiteralMarker","definitionDestinationRaw","definitionDestinationString")(d)}function u(d){return e.attempt(Eo,p,p)(d)}function p(d){return z(d)?H(e,h,"whitespace")(d):h(d)}function h(d){return d===null||M(d)?(e.exit("definition"),a.parser.defined.push(r),n(d)):t(d)}}function Mo(e,n,t){return a;function a(s){return K(s)?_e(e,r)(s):t(s)}function r(s){return Zt(e,o,t,"definitionTitle","definitionTitleMarker","definitionTitleString")(s)}function o(s){return z(s)?H(e,i,"whitespace")(s):i(s)}function i(s){return s===null||M(s)?n(s):t(s)}}const Lo={name:"hardBreakEscape",tokenize:Po};function Po(e,n,t){return a;function a(o){return e.enter("hardBreakEscape"),e.consume(o),r}function r(o){return M(o)?(e.exit("hardBreakEscape"),n(o)):t(o)}}const Oo={name:"headingAtx",resolve:qo,tokenize:Do};function qo(e,n){let t=e.length-2,a=3,r,o;return e[a][1].type==="whitespace"&&(a+=2),t-2>a&&e[t][1].type==="whitespace"&&(t-=2),e[t][1].type==="atxHeadingSequence"&&(a===t-1||t-4>a&&e[t-2][1].type==="whitespace")&&(t-=a+1===t?2:4),t>a&&(r={type:"atxHeadingText",start:e[a][1].start,end:e[t][1].end},o={type:"chunkText",start:e[a][1].start,end:e[t][1].end,contentType:"text"},ce(e,a,t-a+1,[["enter",r,n],["enter",o,n],["exit",o,n],["exit",r,n]])),e}function Do(e,n,t){let a=0;return r;function r(u){return e.enter("atxHeading"),o(u)}function o(u){return e.enter("atxHeadingSequence"),i(u)}function i(u){return u===35&&a++<6?(e.consume(u),i):u===null||K(u)?(e.exit("atxHeadingSequence"),s(u)):t(u)}function s(u){return u===35?(e.enter("atxHeadingSequence"),c(u)):u===null||M(u)?(e.exit("atxHeading"),n(u)):z(u)?H(e,s,"whitespace")(u):(e.enter("atxHeadingText"),l(u))}function c(u){return u===35?(e.consume(u),c):(e.exit("atxHeadingSequence"),s(u))}function l(u){return u===null||u===35||K(u)?(e.exit("atxHeadingText"),s(u)):(e.consume(u),l)}}const No=["address","article","aside","base","basefont","blockquote","body","caption","center","col","colgroup","dd","details","dialog","dir","div","dl","dt","fieldset","figcaption","figure","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","iframe","legend","li","link","main","menu","menuitem","nav","noframes","ol","optgroup","option","p","param","search","section","summary","table","tbody","td","tfoot","th","thead","title","tr","track","ul"],lt=["pre","script","style","textarea"],zo={concrete:!0,name:"htmlFlow",resolveTo:_o,tokenize:jo},Fo={partial:!0,tokenize:Vo},Bo={partial:!0,tokenize:Uo};function _o(e){let n=e.length;for(;n--&&!(e[n][0]==="enter"&&e[n][1].type==="htmlFlow"););return n>1&&e[n-2][1].type==="linePrefix"&&(e[n][1].start=e[n-2][1].start,e[n+1][1].start=e[n-2][1].start,e.splice(n-2,2)),e}function jo(e,n,t){const a=this;let r,o,i,s,c;return l;function l(f){return u(f)}function u(f){return e.enter("htmlFlow"),e.enter("htmlFlowData"),e.consume(f),p}function p(f){return f===33?(e.consume(f),h):f===47?(e.consume(f),o=!0,b):f===63?(e.consume(f),r=3,a.interrupt?n:m):ue(f)?(e.consume(f),i=String.fromCharCode(f),S):t(f)}function h(f){return f===45?(e.consume(f),r=2,d):f===91?(e.consume(f),r=5,s=0,v):ue(f)?(e.consume(f),r=4,a.interrupt?n:m):t(f)}function d(f){return f===45?(e.consume(f),a.interrupt?n:m):t(f)}function v(f){const ie="CDATA[";return f===ie.charCodeAt(s++)?(e.consume(f),s===ie.length?a.interrupt?n:w:v):t(f)}function b(f){return ue(f)?(e.consume(f),i=String.fromCharCode(f),S):t(f)}function S(f){if(f===null||f===47||f===62||K(f)){const ie=f===47,be=i.toLowerCase();return!ie&&!o&&lt.includes(be)?(r=1,a.interrupt?n(f):w(f)):No.includes(i.toLowerCase())?(r=6,ie?(e.consume(f),g):a.interrupt?n(f):w(f)):(r=7,a.interrupt&&!a.parser.lazy[a.now().line]?t(f):o?T(f):A(f))}return f===45||te(f)?(e.consume(f),i+=String.fromCharCode(f),S):t(f)}function g(f){return f===62?(e.consume(f),a.interrupt?n:w):t(f)}function T(f){return z(f)?(e.consume(f),T):_(f)}function A(f){return f===47?(e.consume(f),_):f===58||f===95||ue(f)?(e.consume(f),B):z(f)?(e.consume(f),A):_(f)}function B(f){return f===45||f===46||f===58||f===95||te(f)?(e.consume(f),B):U(f)}function U(f){return f===61?(e.consume(f),x):z(f)?(e.consume(f),U):A(f)}function x(f){return f===null||f===60||f===61||f===62||f===96?t(f):f===34||f===39?(e.consume(f),c=f,N):z(f)?(e.consume(f),x):G(f)}function N(f){return f===c?(e.consume(f),c=null,F):f===null||M(f)?t(f):(e.consume(f),N)}function G(f){return f===null||f===34||f===39||f===47||f===60||f===61||f===62||f===96||K(f)?U(f):(e.consume(f),G)}function F(f){return f===47||f===62||z(f)?A(f):t(f)}function _(f){return f===62?(e.consume(f),R):t(f)}function R(f){return f===null||M(f)?w(f):z(f)?(e.consume(f),R):t(f)}function w(f){return f===45&&r===2?(e.consume(f),Q):f===60&&r===1?(e.consume(f),J):f===62&&r===4?(e.consume(f),oe):f===63&&r===3?(e.consume(f),m):f===93&&r===5?(e.consume(f),de):M(f)&&(r===6||r===7)?(e.exit("htmlFlowData"),e.check(Fo,pe,E)(f)):f===null||M(f)?(e.exit("htmlFlowData"),E(f)):(e.consume(f),w)}function E(f){return e.check(Bo,I,pe)(f)}function I(f){return e.enter("lineEnding"),e.consume(f),e.exit("lineEnding"),L}function L(f){return f===null||M(f)?E(f):(e.enter("htmlFlowData"),w(f))}function Q(f){return f===45?(e.consume(f),m):w(f)}function J(f){return f===47?(e.consume(f),i="",re):w(f)}function re(f){if(f===62){const ie=i.toLowerCase();return lt.includes(ie)?(e.consume(f),oe):w(f)}return ue(f)&&i.length<8?(e.consume(f),i+=String.fromCharCode(f),re):w(f)}function de(f){return f===93?(e.consume(f),m):w(f)}function m(f){return f===62?(e.consume(f),oe):f===45&&r===2?(e.consume(f),m):w(f)}function oe(f){return f===null||M(f)?(e.exit("htmlFlowData"),pe(f)):(e.consume(f),oe)}function pe(f){return e.exit("htmlFlow"),n(f)}}function Uo(e,n,t){const a=this;return r;function r(i){return M(i)?(e.enter("lineEnding"),e.consume(i),e.exit("lineEnding"),o):t(i)}function o(i){return a.parser.lazy[a.now().line]?t(i):n(i)}}function Vo(e,n,t){return a;function a(r){return e.enter("lineEnding"),e.consume(r),e.exit("lineEnding"),e.attempt(Ke,n,t)}}const Ho={name:"htmlText",tokenize:Go};function Go(e,n,t){const a=this;let r,o,i;return s;function s(m){return e.enter("htmlText"),e.enter("htmlTextData"),e.consume(m),c}function c(m){return m===33?(e.consume(m),l):m===47?(e.consume(m),U):m===63?(e.consume(m),A):ue(m)?(e.consume(m),G):t(m)}function l(m){return m===45?(e.consume(m),u):m===91?(e.consume(m),o=0,v):ue(m)?(e.consume(m),T):t(m)}function u(m){return m===45?(e.consume(m),d):t(m)}function p(m){return m===null?t(m):m===45?(e.consume(m),h):M(m)?(i=p,J(m)):(e.consume(m),p)}function h(m){return m===45?(e.consume(m),d):p(m)}function d(m){return m===62?Q(m):m===45?h(m):p(m)}function v(m){const oe="CDATA[";return m===oe.charCodeAt(o++)?(e.consume(m),o===oe.length?b:v):t(m)}function b(m){return m===null?t(m):m===93?(e.consume(m),S):M(m)?(i=b,J(m)):(e.consume(m),b)}function S(m){return m===93?(e.consume(m),g):b(m)}function g(m){return m===62?Q(m):m===93?(e.consume(m),g):b(m)}function T(m){return m===null||m===62?Q(m):M(m)?(i=T,J(m)):(e.consume(m),T)}function A(m){return m===null?t(m):m===63?(e.consume(m),B):M(m)?(i=A,J(m)):(e.consume(m),A)}function B(m){return m===62?Q(m):A(m)}function U(m){return ue(m)?(e.consume(m),x):t(m)}function x(m){return m===45||te(m)?(e.consume(m),x):N(m)}function N(m){return M(m)?(i=N,J(m)):z(m)?(e.consume(m),N):Q(m)}function G(m){return m===45||te(m)?(e.consume(m),G):m===47||m===62||K(m)?F(m):t(m)}function F(m){return m===47?(e.consume(m),Q):m===58||m===95||ue(m)?(e.consume(m),_):M(m)?(i=F,J(m)):z(m)?(e.consume(m),F):Q(m)}function _(m){return m===45||m===46||m===58||m===95||te(m)?(e.consume(m),_):R(m)}function R(m){return m===61?(e.consume(m),w):M(m)?(i=R,J(m)):z(m)?(e.consume(m),R):F(m)}function w(m){return m===null||m===60||m===61||m===62||m===96?t(m):m===34||m===39?(e.consume(m),r=m,E):M(m)?(i=w,J(m)):z(m)?(e.consume(m),w):(e.consume(m),I)}function E(m){return m===r?(e.consume(m),r=void 0,L):m===null?t(m):M(m)?(i=E,J(m)):(e.consume(m),E)}function I(m){return m===null||m===34||m===39||m===60||m===61||m===96?t(m):m===47||m===62||K(m)?F(m):(e.consume(m),I)}function L(m){return m===47||m===62||K(m)?F(m):t(m)}function Q(m){return m===62?(e.consume(m),e.exit("htmlTextData"),e.exit("htmlText"),n):t(m)}function J(m){return e.exit("htmlTextData"),e.enter("lineEnding"),e.consume(m),e.exit("lineEnding"),re}function re(m){return z(m)?H(e,de,"linePrefix",a.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(m):de(m)}function de(m){return e.enter("htmlTextData"),i(m)}}const On={name:"labelEnd",resolveAll:Yo,resolveTo:$o,tokenize:Xo},Wo={tokenize:Ko},Qo={tokenize:Zo},Jo={tokenize:ei};function Yo(e){let n=-1;const t=[];for(;++n<e.length;){const a=e[n][1];if(t.push(e[n]),a.type==="labelImage"||a.type==="labelLink"||a.type==="labelEnd"){const r=a.type==="labelImage"?4:2;a.type="data",n+=r}}return e.length!==t.length&&ce(e,0,e.length,t),e}function $o(e,n){let t=e.length,a=0,r,o,i,s;for(;t--;)if(r=e[t][1],o){if(r.type==="link"||r.type==="labelLink"&&r._inactive)break;e[t][0]==="enter"&&r.type==="labelLink"&&(r._inactive=!0)}else if(i){if(e[t][0]==="enter"&&(r.type==="labelImage"||r.type==="labelLink")&&!r._balanced&&(o=t,r.type!=="labelLink")){a=2;break}}else r.type==="labelEnd"&&(i=t);const c={type:e[o][1].type==="labelLink"?"link":"image",start:{...e[o][1].start},end:{...e[e.length-1][1].end}},l={type:"label",start:{...e[o][1].start},end:{...e[i][1].end}},u={type:"labelText",start:{...e[o+a+2][1].end},end:{...e[i-2][1].start}};return s=[["enter",c,n],["enter",l,n]],s=ae(s,e.slice(o+1,o+a+3)),s=ae(s,[["enter",u,n]]),s=ae(s,Pn(n.parser.constructs.insideSpan.null,e.slice(o+a+4,i-3),n)),s=ae(s,[["exit",u,n],e[i-2],e[i-1],["exit",l,n]]),s=ae(s,e.slice(i+1)),s=ae(s,[["exit",c,n]]),ce(e,o,e.length,s),e}function Xo(e,n,t){const a=this;let r=a.events.length,o,i;for(;r--;)if((a.events[r][1].type==="labelImage"||a.events[r][1].type==="labelLink")&&!a.events[r][1]._balanced){o=a.events[r][1];break}return s;function s(h){return o?o._inactive?p(h):(i=a.parser.defined.includes(we(a.sliceSerialize({start:o.end,end:a.now()}))),e.enter("labelEnd"),e.enter("labelMarker"),e.consume(h),e.exit("labelMarker"),e.exit("labelEnd"),c):t(h)}function c(h){return h===40?e.attempt(Wo,u,i?u:p)(h):h===91?e.attempt(Qo,u,i?l:p)(h):i?u(h):p(h)}function l(h){return e.attempt(Jo,u,p)(h)}function u(h){return n(h)}function p(h){return o._balanced=!0,t(h)}}function Ko(e,n,t){return a;function a(p){return e.enter("resource"),e.enter("resourceMarker"),e.consume(p),e.exit("resourceMarker"),r}function r(p){return K(p)?_e(e,o)(p):o(p)}function o(p){return p===41?u(p):Xt(e,i,s,"resourceDestination","resourceDestinationLiteral","resourceDestinationLiteralMarker","resourceDestinationRaw","resourceDestinationString",32)(p)}function i(p){return K(p)?_e(e,c)(p):u(p)}function s(p){return t(p)}function c(p){return p===34||p===39||p===40?Zt(e,l,t,"resourceTitle","resourceTitleMarker","resourceTitleString")(p):u(p)}function l(p){return K(p)?_e(e,u)(p):u(p)}function u(p){return p===41?(e.enter("resourceMarker"),e.consume(p),e.exit("resourceMarker"),e.exit("resource"),n):t(p)}}function Zo(e,n,t){const a=this;return r;function r(s){return Kt.call(a,e,o,i,"reference","referenceMarker","referenceString")(s)}function o(s){return a.parser.defined.includes(we(a.sliceSerialize(a.events[a.events.length-1][1]).slice(1,-1)))?n(s):t(s)}function i(s){return t(s)}}function ei(e,n,t){return a;function a(o){return e.enter("reference"),e.enter("referenceMarker"),e.consume(o),e.exit("referenceMarker"),r}function r(o){return o===93?(e.enter("referenceMarker"),e.consume(o),e.exit("referenceMarker"),e.exit("reference"),n):t(o)}}const ni={name:"labelStartImage",resolveAll:On.resolveAll,tokenize:ti};function ti(e,n,t){const a=this;return r;function r(s){return e.enter("labelImage"),e.enter("labelImageMarker"),e.consume(s),e.exit("labelImageMarker"),o}function o(s){return s===91?(e.enter("labelMarker"),e.consume(s),e.exit("labelMarker"),e.exit("labelImage"),i):t(s)}function i(s){return s===94&&"_hiddenFootnoteSupport"in a.parser.constructs?t(s):n(s)}}const ai={name:"labelStartLink",resolveAll:On.resolveAll,tokenize:ri};function ri(e,n,t){const a=this;return r;function r(i){return e.enter("labelLink"),e.enter("labelMarker"),e.consume(i),e.exit("labelMarker"),e.exit("labelLink"),o}function o(i){return i===94&&"_hiddenFootnoteSupport"in a.parser.constructs?t(i):n(i)}}const on={name:"lineEnding",tokenize:oi};function oi(e,n){return t;function t(a){return e.enter("lineEnding"),e.consume(a),e.exit("lineEnding"),H(e,n,"linePrefix")}}const Ye={name:"thematicBreak",tokenize:ii};function ii(e,n,t){let a=0,r;return o;function o(l){return e.enter("thematicBreak"),i(l)}function i(l){return r=l,s(l)}function s(l){return l===r?(e.enter("thematicBreakSequence"),c(l)):a>=3&&(l===null||M(l))?(e.exit("thematicBreak"),n(l)):t(l)}function c(l){return l===r?(e.consume(l),a++,c):(e.exit("thematicBreakSequence"),z(l)?H(e,s,"whitespace")(l):s(l))}}const X={continuation:{tokenize:ci},exit:pi,name:"list",tokenize:ui},si={partial:!0,tokenize:mi},li={partial:!0,tokenize:di};function ui(e,n,t){const a=this,r=a.events[a.events.length-1];let o=r&&r[1].type==="linePrefix"?r[2].sliceSerialize(r[1],!0).length:0,i=0;return s;function s(d){const v=a.containerState.type||(d===42||d===43||d===45?"listUnordered":"listOrdered");if(v==="listUnordered"?!a.containerState.marker||d===a.containerState.marker:xn(d)){if(a.containerState.type||(a.containerState.type=v,e.enter(v,{_container:!0})),v==="listUnordered")return e.enter("listItemPrefix"),d===42||d===45?e.check(Ye,t,l)(d):l(d);if(!a.interrupt||d===49)return e.enter("listItemPrefix"),e.enter("listItemValue"),c(d)}return t(d)}function c(d){return xn(d)&&++i<10?(e.consume(d),c):(!a.interrupt||i<2)&&(a.containerState.marker?d===a.containerState.marker:d===41||d===46)?(e.exit("listItemValue"),l(d)):t(d)}function l(d){return e.enter("listItemMarker"),e.consume(d),e.exit("listItemMarker"),a.containerState.marker=a.containerState.marker||d,e.check(Ke,a.interrupt?t:u,e.attempt(si,h,p))}function u(d){return a.containerState.initialBlankLine=!0,o++,h(d)}function p(d){return z(d)?(e.enter("listItemPrefixWhitespace"),e.consume(d),e.exit("listItemPrefixWhitespace"),h):t(d)}function h(d){return a.containerState.size=o+a.sliceSerialize(e.exit("listItemPrefix"),!0).length,n(d)}}function ci(e,n,t){const a=this;return a.containerState._closeFlow=void 0,e.check(Ke,r,o);function r(s){return a.containerState.furtherBlankLines=a.containerState.furtherBlankLines||a.containerState.initialBlankLine,H(e,n,"listItemIndent",a.containerState.size+1)(s)}function o(s){return a.containerState.furtherBlankLines||!z(s)?(a.containerState.furtherBlankLines=void 0,a.containerState.initialBlankLine=void 0,i(s)):(a.containerState.furtherBlankLines=void 0,a.containerState.initialBlankLine=void 0,e.attempt(li,n,i)(s))}function i(s){return a.containerState._closeFlow=!0,a.interrupt=void 0,H(e,e.attempt(X,n,t),"linePrefix",a.parser.constructs.disable.null.includes("codeIndented")?void 0:4)(s)}}function di(e,n,t){const a=this;return H(e,r,"listItemIndent",a.containerState.size+1);function r(o){const i=a.events[a.events.length-1];return i&&i[1].type==="listItemIndent"&&i[2].sliceSerialize(i[1],!0).length===a.containerState.size?n(o):t(o)}}function pi(e){e.exit(this.containerState.type)}function mi(e,n,t){const a=this;return H(e,r,"listItemPrefixWhitespace",a.parser.constructs.disable.null.includes("codeIndented")?void 0:5);function r(o){const i=a.events[a.events.length-1];return!z(o)&&i&&i[1].type==="listItemPrefixWhitespace"?n(o):t(o)}}const ut={name:"setextUnderline",resolveTo:fi,tokenize:hi};function fi(e,n){let t=e.length,a,r,o;for(;t--;)if(e[t][0]==="enter"){if(e[t][1].type==="content"){a=t;break}e[t][1].type==="paragraph"&&(r=t)}else e[t][1].type==="content"&&e.splice(t,1),!o&&e[t][1].type==="definition"&&(o=t);const i={type:"setextHeading",start:{...e[a][1].start},end:{...e[e.length-1][1].end}};return e[r][1].type="setextHeadingText",o?(e.splice(r,0,["enter",i,n]),e.splice(o+1,0,["exit",e[a][1],n]),e[a][1].end={...e[o][1].end}):e[a][1]=i,e.push(["exit",i,n]),e}function hi(e,n,t){const a=this;let r;return o;function o(l){let u=a.events.length,p;for(;u--;)if(a.events[u][1].type!=="lineEnding"&&a.events[u][1].type!=="linePrefix"&&a.events[u][1].type!=="content"){p=a.events[u][1].type==="paragraph";break}return!a.parser.lazy[a.now().line]&&(a.interrupt||p)?(e.enter("setextHeadingLine"),r=l,i(l)):t(l)}function i(l){return e.enter("setextHeadingLineSequence"),s(l)}function s(l){return l===r?(e.consume(l),s):(e.exit("setextHeadingLineSequence"),z(l)?H(e,c,"lineSuffix")(l):c(l))}function c(l){return l===null||M(l)?(e.exit("setextHeadingLine"),n(l)):t(l)}}const gi={tokenize:yi};function yi(e){const n=this,t=e.attempt(Ke,a,e.attempt(this.parser.constructs.flowInitial,r,H(e,e.attempt(this.parser.constructs.flow,r,e.attempt(ko,r)),"linePrefix")));return t;function a(o){if(o===null){e.consume(o);return}return e.enter("lineEndingBlank"),e.consume(o),e.exit("lineEndingBlank"),n.currentConstruct=void 0,t}function r(o){if(o===null){e.consume(o);return}return e.enter("lineEnding"),e.consume(o),e.exit("lineEnding"),n.currentConstruct=void 0,t}}const bi={resolveAll:na()},xi=ea("string"),vi=ea("text");function ea(e){return{resolveAll:na(e==="text"?Ci:void 0),tokenize:n};function n(t){const a=this,r=this.parser.constructs[e],o=t.attempt(r,i,s);return i;function i(u){return l(u)?o(u):s(u)}function s(u){if(u===null){t.consume(u);return}return t.enter("data"),t.consume(u),c}function c(u){return l(u)?(t.exit("data"),o(u)):(t.consume(u),c)}function l(u){if(u===null)return!0;const p=r[u];let h=-1;if(p)for(;++h<p.length;){const d=p[h];if(!d.previous||d.previous.call(a,a.previous))return!0}return!1}}}function na(e){return n;function n(t,a){let r=-1,o;for(;++r<=t.length;)o===void 0?t[r]&&t[r][1].type==="data"&&(o=r,r++):(!t[r]||t[r][1].type!=="data")&&(r!==o+2&&(t[o][1].end=t[r-1][1].end,t.splice(o+2,r-o-2),r=o+2),o=void 0);return e?e(t,a):t}}function Ci(e,n){let t=0;for(;++t<=e.length;)if((t===e.length||e[t][1].type==="lineEnding")&&e[t-1][1].type==="data"){const a=e[t-1][1],r=n.sliceStream(a);let o=r.length,i=-1,s=0,c;for(;o--;){const l=r[o];if(typeof l=="string"){for(i=l.length;l.charCodeAt(i-1)===32;)s++,i--;if(i)break;i=-1}else if(l===-2)c=!0,s++;else if(l!==-1){o++;break}}if(n._contentTypeTextTrailing&&t===e.length&&(s=0),s){const l={type:t===e.length||c||s<2?"lineSuffix":"hardBreakTrailing",start:{_bufferIndex:o?i:a.start._bufferIndex+i,_index:a.start._index+o,line:a.end.line,column:a.end.column-s,offset:a.end.offset-s},end:{...a.end}};a.end={...l.start},a.start.offset===a.end.offset?Object.assign(a,l):(e.splice(t,0,["enter",l,n],["exit",l,n]),t+=2)}t++}return e}const ki={42:X,43:X,45:X,48:X,49:X,50:X,51:X,52:X,53:X,54:X,55:X,56:X,57:X,62:Qt},Ti={91:wo},Si={[-2]:rn,[-1]:rn,32:rn},Ai={35:Oo,42:Ye,45:[ut,Ye],60:zo,61:ut,95:Ye,96:st,126:st},Ii={38:Yt,92:Jt},wi={[-5]:on,[-4]:on,[-3]:on,33:ni,38:Yt,42:vn,60:[to,Ho],91:ai,92:[Lo,Jt],93:On,95:vn,96:go},Ei={null:[vn,bi]},Ri={null:[42,95]},Mi={null:[]},Li=Object.freeze(Object.defineProperty({__proto__:null,attentionMarkers:Ri,contentInitial:Ti,disable:Mi,document:ki,flow:Ai,flowInitial:Si,insideSpan:Ei,string:Ii,text:wi},Symbol.toStringTag,{value:"Module"}));function Pi(e,n,t){let a={_bufferIndex:-1,_index:0,line:t&&t.line||1,column:t&&t.column||1,offset:t&&t.offset||0};const r={},o=[];let i=[],s=[];const c={attempt:N(U),check:N(x),consume:T,enter:A,exit:B,interrupt:N(x,{interrupt:!0})},l={code:null,containerState:{},defineSkip:b,events:[],now:v,parser:e,previous:null,sliceSerialize:h,sliceStream:d,write:p};let u=n.tokenize.call(l,c);return n.resolveAll&&o.push(n),l;function p(R){return i=ae(i,R),S(),i[i.length-1]!==null?[]:(G(n,0),l.events=Pn(o,l.events,l),l.events)}function h(R,w){return qi(d(R),w)}function d(R){return Oi(i,R)}function v(){const{_bufferIndex:R,_index:w,line:E,column:I,offset:L}=a;return{_bufferIndex:R,_index:w,line:E,column:I,offset:L}}function b(R){r[R.line]=R.column,_()}function S(){let R;for(;a._index<i.length;){const w=i[a._index];if(typeof w=="string")for(R=a._index,a._bufferIndex<0&&(a._bufferIndex=0);a._index===R&&a._bufferIndex<w.length;)g(w.charCodeAt(a._bufferIndex));else g(w)}}function g(R){u=u(R)}function T(R){M(R)?(a.line++,a.column=1,a.offset+=R===-3?2:1,_()):R!==-1&&(a.column++,a.offset++),a._bufferIndex<0?a._index++:(a._bufferIndex++,a._bufferIndex===i[a._index].length&&(a._bufferIndex=-1,a._index++)),l.previous=R}function A(R,w){const E=w||{};return E.type=R,E.start=v(),l.events.push(["enter",E,l]),s.push(E),E}function B(R){const w=s.pop();return w.end=v(),l.events.push(["exit",w,l]),w}function U(R,w){G(R,w.from)}function x(R,w){w.restore()}function N(R,w){return E;function E(I,L,Q){let J,re,de,m;return Array.isArray(I)?pe(I):"tokenize"in I?pe([I]):oe(I);function oe(Y){return Me;function Me(he){const Ce=he!==null&&Y[he],ke=he!==null&&Y.null,Ge=[...Array.isArray(Ce)?Ce:Ce?[Ce]:[],...Array.isArray(ke)?ke:ke?[ke]:[]];return pe(Ge)(he)}}function pe(Y){return J=Y,re=0,Y.length===0?Q:f(Y[re])}function f(Y){return Me;function Me(he){return m=F(),de=Y,Y.partial||(l.currentConstruct=Y),Y.name&&l.parser.constructs.disable.null.includes(Y.name)?be():Y.tokenize.call(w?Object.assign(Object.create(l),w):l,c,ie,be)(he)}}function ie(Y){return R(de,m),L}function be(Y){return m.restore(),++re<J.length?f(J[re]):Q}}}function G(R,w){R.resolveAll&&!o.includes(R)&&o.push(R),R.resolve&&ce(l.events,w,l.events.length-w,R.resolve(l.events.slice(w),l)),R.resolveTo&&(l.events=R.resolveTo(l.events,l))}function F(){const R=v(),w=l.previous,E=l.currentConstruct,I=l.events.length,L=Array.from(s);return{from:I,restore:Q};function Q(){a=R,l.previous=w,l.currentConstruct=E,l.events.length=I,s=L,_()}}function _(){a.line in r&&a.column<2&&(a.column=r[a.line],a.offset+=r[a.line]-1)}}function Oi(e,n){const t=n.start._index,a=n.start._bufferIndex,r=n.end._index,o=n.end._bufferIndex;let i;if(t===r)i=[e[t].slice(a,o)];else{if(i=e.slice(t,r),a>-1){const s=i[0];typeof s=="string"?i[0]=s.slice(a):i.shift()}o>0&&i.push(e[r].slice(0,o))}return i}function qi(e,n){let t=-1;const a=[];let r;for(;++t<e.length;){const o=e[t];let i;if(typeof o=="string")i=o;else switch(o){case-5:{i="\r";break}case-4:{i=`
`;break}case-3:{i=`\r
`;break}case-2:{i=n?" ":"	";break}case-1:{if(!n&&r)continue;i=" ";break}default:i=String.fromCharCode(o)}r=o===-2,a.push(i)}return a.join("")}function Di(e){const a={constructs:jr([Li,...(e||{}).extensions||[]]),content:r(Yr),defined:[],document:r(Xr),flow:r(gi),lazy:{},string:r(xi),text:r(vi)};return a;function r(o){return i;function i(s){return Pi(a,o,s)}}}function Ni(e){for(;!$t(e););return e}const ct=/[\0\t\n\r]/g;function zi(){let e=1,n="",t=!0,a;return r;function r(o,i,s){const c=[];let l,u,p,h,d;for(o=n+(typeof o=="string"?o.toString():new TextDecoder(i||void 0).decode(o)),p=0,n="",t&&(o.charCodeAt(0)===65279&&p++,t=void 0);p<o.length;){if(ct.lastIndex=p,l=ct.exec(o),h=l&&l.index!==void 0?l.index:o.length,d=o.charCodeAt(h),!l){n=o.slice(p);break}if(d===10&&p===h&&a)c.push(-3),a=void 0;else switch(a&&(c.push(-5),a=void 0),p<h&&(c.push(o.slice(p,h)),e+=h-p),d){case 0:{c.push(65533),e++;break}case 9:{for(u=Math.ceil(e/4)*4,c.push(-2);e++<u;)c.push(-1);break}case 10:{c.push(-4),e=1;break}default:a=!0,e=1}p=h+1}return s&&(a&&c.push(-5),n&&c.push(n),c.push(null)),c}}const Fi=/\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;function Bi(e){return e.replace(Fi,_i)}function _i(e,n,t){if(n)return n;if(t.charCodeAt(0)===35){const r=t.charCodeAt(1),o=r===120||r===88;return Wt(t.slice(o?2:1),o?16:10)}return Ln(t)||e}const ta={}.hasOwnProperty;function ji(e,n,t){return typeof n!="string"&&(t=n,n=void 0),Ui(t)(Ni(Di(t).document().write(zi()(e,n,!0))))}function Ui(e){const n={transforms:[],canContainEols:["emphasis","fragment","heading","paragraph","strong"],enter:{autolink:o(Un),autolinkProtocol:F,autolinkEmail:F,atxHeading:o(Bn),blockQuote:o(ke),characterEscape:F,characterReference:F,codeFenced:o(Ge),codeFencedFenceInfo:i,codeFencedFenceMeta:i,codeIndented:o(Ge,i),codeText:o(ma,i),codeTextData:F,data:F,codeFlowValue:F,definition:o(fa),definitionDestinationString:i,definitionLabelString:i,definitionTitleString:i,emphasis:o(ha),hardBreakEscape:o(_n),hardBreakTrailing:o(_n),htmlFlow:o(jn,i),htmlFlowData:F,htmlText:o(jn,i),htmlTextData:F,image:o(ga),label:i,link:o(Un),listItem:o(ya),listItemValue:h,listOrdered:o(Vn,p),listUnordered:o(Vn),paragraph:o(ba),reference:f,referenceString:i,resourceDestinationString:i,resourceTitleString:i,setextHeading:o(Bn),strong:o(xa),thematicBreak:o(Ca)},exit:{atxHeading:c(),atxHeadingSequence:U,autolink:c(),autolinkEmail:Ce,autolinkProtocol:he,blockQuote:c(),characterEscapeValue:_,characterReferenceMarkerHexadecimal:be,characterReferenceMarkerNumeric:be,characterReferenceValue:Y,characterReference:Me,codeFenced:c(S),codeFencedFence:b,codeFencedFenceInfo:d,codeFencedFenceMeta:v,codeFlowValue:_,codeIndented:c(g),codeText:c(L),codeTextData:_,data:_,definition:c(),definitionDestinationString:B,definitionLabelString:T,definitionTitleString:A,emphasis:c(),hardBreakEscape:c(w),hardBreakTrailing:c(w),htmlFlow:c(E),htmlFlowData:_,htmlText:c(I),htmlTextData:_,image:c(J),label:de,labelText:re,lineEnding:R,link:c(Q),listItem:c(),listOrdered:c(),listUnordered:c(),paragraph:c(),referenceString:ie,resourceDestinationString:m,resourceTitleString:oe,resource:pe,setextHeading:c(G),setextHeadingLineSequence:N,setextHeadingText:x,strong:c(),thematicBreak:c()}};aa(n,(e||{}).mdastExtensions||[]);const t={};return a;function a(y){let k={type:"root",children:[]};const P={stack:[k],tokenStack:[],config:n,enter:s,exit:l,buffer:i,resume:u,data:t},D=[];let j=-1;for(;++j<y.length;)if(y[j][1].type==="listOrdered"||y[j][1].type==="listUnordered")if(y[j][0]==="enter")D.push(j);else{const se=D.pop();j=r(y,se,j)}for(j=-1;++j<y.length;){const se=n[y[j][0]];ta.call(se,y[j][1].type)&&se[y[j][1].type].call(Object.assign({sliceSerialize:y[j][2].sliceSerialize},P),y[j][1])}if(P.tokenStack.length>0){const se=P.tokenStack[P.tokenStack.length-1];(se[1]||dt).call(P,void 0,se[0])}for(k.position={start:ge(y.length>0?y[0][1].start:{line:1,column:1,offset:0}),end:ge(y.length>0?y[y.length-2][1].end:{line:1,column:1,offset:0})},j=-1;++j<n.transforms.length;)k=n.transforms[j](k)||k;return k}function r(y,k,P){let D=k-1,j=-1,se=!1,xe,me,Le,Pe;for(;++D<=P;){const ee=y[D];switch(ee[1].type){case"listUnordered":case"listOrdered":case"blockQuote":{ee[0]==="enter"?j++:j--,Pe=void 0;break}case"lineEndingBlank":{ee[0]==="enter"&&(xe&&!Pe&&!j&&!Le&&(Le=D),Pe=void 0);break}case"linePrefix":case"listItemValue":case"listItemMarker":case"listItemPrefix":case"listItemPrefixWhitespace":break;default:Pe=void 0}if(!j&&ee[0]==="enter"&&ee[1].type==="listItemPrefix"||j===-1&&ee[0]==="exit"&&(ee[1].type==="listUnordered"||ee[1].type==="listOrdered")){if(xe){let Te=D;for(me=void 0;Te--;){const fe=y[Te];if(fe[1].type==="lineEnding"||fe[1].type==="lineEndingBlank"){if(fe[0]==="exit")continue;me&&(y[me][1].type="lineEndingBlank",se=!0),fe[1].type="lineEnding",me=Te}else if(!(fe[1].type==="linePrefix"||fe[1].type==="blockQuotePrefix"||fe[1].type==="blockQuotePrefixWhitespace"||fe[1].type==="blockQuoteMarker"||fe[1].type==="listItemIndent"))break}Le&&(!me||Le<me)&&(xe._spread=!0),xe.end=Object.assign({},me?y[me][1].start:ee[1].end),y.splice(me||D,0,["exit",xe,ee[2]]),D++,P++}if(ee[1].type==="listItemPrefix"){const Te={type:"listItem",_spread:!1,start:Object.assign({},ee[1].start),end:void 0};xe=Te,y.splice(D,0,["enter",Te,ee[2]]),D++,P++,Le=void 0,Pe=!0}}}return y[k][1]._spread=se,P}function o(y,k){return P;function P(D){s.call(this,y(D),D),k&&k.call(this,D)}}function i(){this.stack.push({type:"fragment",children:[]})}function s(y,k,P){this.stack[this.stack.length-1].children.push(y),this.stack.push(y),this.tokenStack.push([k,P||void 0]),y.position={start:ge(k.start),end:void 0}}function c(y){return k;function k(P){y&&y.call(this,P),l.call(this,P)}}function l(y,k){const P=this.stack.pop(),D=this.tokenStack.pop();if(D)D[0].type!==y.type&&(k?k.call(this,y,D[0]):(D[1]||dt).call(this,y,D[0]));else throw new Error("Cannot close `"+y.type+"` ("+Be({start:y.start,end:y.end})+"): it’s not open");P.position.end=ge(y.end)}function u(){return Br(this.stack.pop())}function p(){this.data.expectingFirstListItemValue=!0}function h(y){if(this.data.expectingFirstListItemValue){const k=this.stack[this.stack.length-2];k.start=Number.parseInt(this.sliceSerialize(y),10),this.data.expectingFirstListItemValue=void 0}}function d(){const y=this.resume(),k=this.stack[this.stack.length-1];k.lang=y}function v(){const y=this.resume(),k=this.stack[this.stack.length-1];k.meta=y}function b(){this.data.flowCodeInside||(this.buffer(),this.data.flowCodeInside=!0)}function S(){const y=this.resume(),k=this.stack[this.stack.length-1];k.value=y.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g,""),this.data.flowCodeInside=void 0}function g(){const y=this.resume(),k=this.stack[this.stack.length-1];k.value=y.replace(/(\r?\n|\r)$/g,"")}function T(y){const k=this.resume(),P=this.stack[this.stack.length-1];P.label=k,P.identifier=we(this.sliceSerialize(y)).toLowerCase()}function A(){const y=this.resume(),k=this.stack[this.stack.length-1];k.title=y}function B(){const y=this.resume(),k=this.stack[this.stack.length-1];k.url=y}function U(y){const k=this.stack[this.stack.length-1];if(!k.depth){const P=this.sliceSerialize(y).length;k.depth=P}}function x(){this.data.setextHeadingSlurpLineEnding=!0}function N(y){const k=this.stack[this.stack.length-1];k.depth=this.sliceSerialize(y).codePointAt(0)===61?1:2}function G(){this.data.setextHeadingSlurpLineEnding=void 0}function F(y){const P=this.stack[this.stack.length-1].children;let D=P[P.length-1];(!D||D.type!=="text")&&(D=va(),D.position={start:ge(y.start),end:void 0},P.push(D)),this.stack.push(D)}function _(y){const k=this.stack.pop();k.value+=this.sliceSerialize(y),k.position.end=ge(y.end)}function R(y){const k=this.stack[this.stack.length-1];if(this.data.atHardBreak){const P=k.children[k.children.length-1];P.position.end=ge(y.end),this.data.atHardBreak=void 0;return}!this.data.setextHeadingSlurpLineEnding&&n.canContainEols.includes(k.type)&&(F.call(this,y),_.call(this,y))}function w(){this.data.atHardBreak=!0}function E(){const y=this.resume(),k=this.stack[this.stack.length-1];k.value=y}function I(){const y=this.resume(),k=this.stack[this.stack.length-1];k.value=y}function L(){const y=this.resume(),k=this.stack[this.stack.length-1];k.value=y}function Q(){const y=this.stack[this.stack.length-1];if(this.data.inReference){const k=this.data.referenceType||"shortcut";y.type+="Reference",y.referenceType=k,delete y.url,delete y.title}else delete y.identifier,delete y.label;this.data.referenceType=void 0}function J(){const y=this.stack[this.stack.length-1];if(this.data.inReference){const k=this.data.referenceType||"shortcut";y.type+="Reference",y.referenceType=k,delete y.url,delete y.title}else delete y.identifier,delete y.label;this.data.referenceType=void 0}function re(y){const k=this.sliceSerialize(y),P=this.stack[this.stack.length-2];P.label=Bi(k),P.identifier=we(k).toLowerCase()}function de(){const y=this.stack[this.stack.length-1],k=this.resume(),P=this.stack[this.stack.length-1];if(this.data.inReference=!0,P.type==="link"){const D=y.children;P.children=D}else P.alt=k}function m(){const y=this.resume(),k=this.stack[this.stack.length-1];k.url=y}function oe(){const y=this.resume(),k=this.stack[this.stack.length-1];k.title=y}function pe(){this.data.inReference=void 0}function f(){this.data.referenceType="collapsed"}function ie(y){const k=this.resume(),P=this.stack[this.stack.length-1];P.label=k,P.identifier=we(this.sliceSerialize(y)).toLowerCase(),this.data.referenceType="full"}function be(y){this.data.characterReferenceType=y.type}function Y(y){const k=this.sliceSerialize(y),P=this.data.characterReferenceType;let D;P?(D=Wt(k,P==="characterReferenceMarkerNumeric"?10:16),this.data.characterReferenceType=void 0):D=Ln(k);const j=this.stack[this.stack.length-1];j.value+=D}function Me(y){const k=this.stack.pop();k.position.end=ge(y.end)}function he(y){_.call(this,y);const k=this.stack[this.stack.length-1];k.url=this.sliceSerialize(y)}function Ce(y){_.call(this,y);const k=this.stack[this.stack.length-1];k.url="mailto:"+this.sliceSerialize(y)}function ke(){return{type:"blockquote",children:[]}}function Ge(){return{type:"code",lang:null,meta:null,value:""}}function ma(){return{type:"inlineCode",value:""}}function fa(){return{type:"definition",identifier:"",label:null,title:null,url:""}}function ha(){return{type:"emphasis",children:[]}}function Bn(){return{type:"heading",depth:0,children:[]}}function _n(){return{type:"break"}}function jn(){return{type:"html",value:""}}function ga(){return{type:"image",title:null,url:"",alt:null}}function Un(){return{type:"link",title:null,url:"",children:[]}}function Vn(y){return{type:"list",ordered:y.type==="listOrdered",start:null,spread:y._spread,children:[]}}function ya(y){return{type:"listItem",spread:y._spread,checked:null,children:[]}}function ba(){return{type:"paragraph",children:[]}}function xa(){return{type:"strong",children:[]}}function va(){return{type:"text",value:""}}function Ca(){return{type:"thematicBreak"}}}function ge(e){return{line:e.line,column:e.column,offset:e.offset}}function aa(e,n){let t=-1;for(;++t<n.length;){const a=n[t];Array.isArray(a)?aa(e,a):Vi(e,a)}}function Vi(e,n){let t;for(t in n)if(ta.call(n,t))switch(t){case"canContainEols":{const a=n[t];a&&e[t].push(...a);break}case"transforms":{const a=n[t];a&&e[t].push(...a);break}case"enter":case"exit":{const a=n[t];a&&Object.assign(e[t],a);break}}}function dt(e,n){throw e?new Error("Cannot close `"+e.type+"` ("+Be({start:e.start,end:e.end})+"): a different token (`"+n.type+"`, "+Be({start:n.start,end:n.end})+") is open"):new Error("Cannot close document, a token (`"+n.type+"`, "+Be({start:n.start,end:n.end})+") is still open")}function Hi(e){const n=this;n.parser=t;function t(a){return ji(a,{...n.data("settings"),...e,extensions:n.data("micromarkExtensions")||[],mdastExtensions:n.data("fromMarkdownExtensions")||[]})}}function Gi(e,n){const t={type:"element",tagName:"blockquote",properties:{},children:e.wrap(e.all(n),!0)};return e.patch(n,t),e.applyData(n,t)}function Wi(e,n){const t={type:"element",tagName:"br",properties:{},children:[]};return e.patch(n,t),[e.applyData(n,t),{type:"text",value:`
`}]}function Qi(e,n){const t=n.value?n.value+`
`:"",a={};n.lang&&(a.className=["language-"+n.lang]);let r={type:"element",tagName:"code",properties:a,children:[{type:"text",value:t}]};return n.meta&&(r.data={meta:n.meta}),e.patch(n,r),r=e.applyData(n,r),r={type:"element",tagName:"pre",properties:{},children:[r]},e.patch(n,r),r}function Ji(e,n){const t={type:"element",tagName:"del",properties:{},children:e.all(n)};return e.patch(n,t),e.applyData(n,t)}function Yi(e,n){const t={type:"element",tagName:"em",properties:{},children:e.all(n)};return e.patch(n,t),e.applyData(n,t)}function $i(e,n){const t=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",a=String(n.identifier).toUpperCase(),r=Re(a.toLowerCase()),o=e.footnoteOrder.indexOf(a);let i,s=e.footnoteCounts.get(a);s===void 0?(s=0,e.footnoteOrder.push(a),i=e.footnoteOrder.length):i=o+1,s+=1,e.footnoteCounts.set(a,s);const c={type:"element",tagName:"a",properties:{href:"#"+t+"fn-"+r,id:t+"fnref-"+r+(s>1?"-"+s:""),dataFootnoteRef:!0,ariaDescribedBy:["footnote-label"]},children:[{type:"text",value:String(i)}]};e.patch(n,c);const l={type:"element",tagName:"sup",properties:{},children:[c]};return e.patch(n,l),e.applyData(n,l)}function Xi(e,n){const t={type:"element",tagName:"h"+n.depth,properties:{},children:e.all(n)};return e.patch(n,t),e.applyData(n,t)}function Ki(e,n){if(e.options.allowDangerousHtml){const t={type:"raw",value:n.value};return e.patch(n,t),e.applyData(n,t)}}function ra(e,n){const t=n.referenceType;let a="]";if(t==="collapsed"?a+="[]":t==="full"&&(a+="["+(n.label||n.identifier)+"]"),n.type==="imageReference")return[{type:"text",value:"!["+n.alt+a}];const r=e.all(n),o=r[0];o&&o.type==="text"?o.value="["+o.value:r.unshift({type:"text",value:"["});const i=r[r.length-1];return i&&i.type==="text"?i.value+=a:r.push({type:"text",value:a}),r}function Zi(e,n){const t=String(n.identifier).toUpperCase(),a=e.definitionById.get(t);if(!a)return ra(e,n);const r={src:Re(a.url||""),alt:n.alt};a.title!==null&&a.title!==void 0&&(r.title=a.title);const o={type:"element",tagName:"img",properties:r,children:[]};return e.patch(n,o),e.applyData(n,o)}function es(e,n){const t={src:Re(n.url)};n.alt!==null&&n.alt!==void 0&&(t.alt=n.alt),n.title!==null&&n.title!==void 0&&(t.title=n.title);const a={type:"element",tagName:"img",properties:t,children:[]};return e.patch(n,a),e.applyData(n,a)}function ns(e,n){const t={type:"text",value:n.value.replace(/\r?\n|\r/g," ")};e.patch(n,t);const a={type:"element",tagName:"code",properties:{},children:[t]};return e.patch(n,a),e.applyData(n,a)}function ts(e,n){const t=String(n.identifier).toUpperCase(),a=e.definitionById.get(t);if(!a)return ra(e,n);const r={href:Re(a.url||"")};a.title!==null&&a.title!==void 0&&(r.title=a.title);const o={type:"element",tagName:"a",properties:r,children:e.all(n)};return e.patch(n,o),e.applyData(n,o)}function as(e,n){const t={href:Re(n.url)};n.title!==null&&n.title!==void 0&&(t.title=n.title);const a={type:"element",tagName:"a",properties:t,children:e.all(n)};return e.patch(n,a),e.applyData(n,a)}function rs(e,n,t){const a=e.all(n),r=t?os(t):oa(n),o={},i=[];if(typeof n.checked=="boolean"){const u=a[0];let p;u&&u.type==="element"&&u.tagName==="p"?p=u:(p={type:"element",tagName:"p",properties:{},children:[]},a.unshift(p)),p.children.length>0&&p.children.unshift({type:"text",value:" "}),p.children.unshift({type:"element",tagName:"input",properties:{type:"checkbox",checked:n.checked,disabled:!0},children:[]}),o.className=["task-list-item"]}let s=-1;for(;++s<a.length;){const u=a[s];(r||s!==0||u.type!=="element"||u.tagName!=="p")&&i.push({type:"text",value:`
`}),u.type==="element"&&u.tagName==="p"&&!r?i.push(...u.children):i.push(u)}const c=a[a.length-1];c&&(r||c.type!=="element"||c.tagName!=="p")&&i.push({type:"text",value:`
`});const l={type:"element",tagName:"li",properties:o,children:i};return e.patch(n,l),e.applyData(n,l)}function os(e){let n=!1;if(e.type==="list"){n=e.spread||!1;const t=e.children;let a=-1;for(;!n&&++a<t.length;)n=oa(t[a])}return n}function oa(e){const n=e.spread;return n??e.children.length>1}function is(e,n){const t={},a=e.all(n);let r=-1;for(typeof n.start=="number"&&n.start!==1&&(t.start=n.start);++r<a.length;){const i=a[r];if(i.type==="element"&&i.tagName==="li"&&i.properties&&Array.isArray(i.properties.className)&&i.properties.className.includes("task-list-item")){t.className=["contains-task-list"];break}}const o={type:"element",tagName:n.ordered?"ol":"ul",properties:t,children:e.wrap(a,!0)};return e.patch(n,o),e.applyData(n,o)}function ss(e,n){const t={type:"element",tagName:"p",properties:{},children:e.all(n)};return e.patch(n,t),e.applyData(n,t)}function ls(e,n){const t={type:"root",children:e.wrap(e.all(n))};return e.patch(n,t),e.applyData(n,t)}function us(e,n){const t={type:"element",tagName:"strong",properties:{},children:e.all(n)};return e.patch(n,t),e.applyData(n,t)}function cs(e,n){const t=e.all(n),a=t.shift(),r=[];if(a){const i={type:"element",tagName:"thead",properties:{},children:e.wrap([a],!0)};e.patch(n.children[0],i),r.push(i)}if(t.length>0){const i={type:"element",tagName:"tbody",properties:{},children:e.wrap(t,!0)},s=wn(n.children[1]),c=Bt(n.children[n.children.length-1]);s&&c&&(i.position={start:s,end:c}),r.push(i)}const o={type:"element",tagName:"table",properties:{},children:e.wrap(r,!0)};return e.patch(n,o),e.applyData(n,o)}function ds(e,n,t){const a=t?t.children:void 0,o=(a?a.indexOf(n):1)===0?"th":"td",i=t&&t.type==="table"?t.align:void 0,s=i?i.length:n.children.length;let c=-1;const l=[];for(;++c<s;){const p=n.children[c],h={},d=i?i[c]:void 0;d&&(h.align=d);let v={type:"element",tagName:o,properties:h,children:[]};p&&(v.children=e.all(p),e.patch(p,v),v=e.applyData(p,v)),l.push(v)}const u={type:"element",tagName:"tr",properties:{},children:e.wrap(l,!0)};return e.patch(n,u),e.applyData(n,u)}function ps(e,n){const t={type:"element",tagName:"td",properties:{},children:e.all(n)};return e.patch(n,t),e.applyData(n,t)}const pt=9,mt=32;function ms(e){const n=String(e),t=/\r?\n|\r/g;let a=t.exec(n),r=0;const o=[];for(;a;)o.push(ft(n.slice(r,a.index),r>0,!0),a[0]),r=a.index+a[0].length,a=t.exec(n);return o.push(ft(n.slice(r),r>0,!1)),o.join("")}function ft(e,n,t){let a=0,r=e.length;if(n){let o=e.codePointAt(a);for(;o===pt||o===mt;)a++,o=e.codePointAt(a)}if(t){let o=e.codePointAt(r-1);for(;o===pt||o===mt;)r--,o=e.codePointAt(r-1)}return r>a?e.slice(a,r):""}function fs(e,n){const t={type:"text",value:ms(String(n.value))};return e.patch(n,t),e.applyData(n,t)}function hs(e,n){const t={type:"element",tagName:"hr",properties:{},children:[]};return e.patch(n,t),e.applyData(n,t)}const gs={blockquote:Gi,break:Wi,code:Qi,delete:Ji,emphasis:Yi,footnoteReference:$i,heading:Xi,html:Ki,imageReference:Zi,image:es,inlineCode:ns,linkReference:ts,link:as,listItem:rs,list:is,paragraph:ss,root:ls,strong:us,table:cs,tableCell:ps,tableRow:ds,text:fs,thematicBreak:hs,toml:We,yaml:We,definition:We,footnoteDefinition:We};function We(){}const ia=-1,Ze=0,je=1,$e=2,qn=3,Dn=4,Nn=5,zn=6,sa=7,la=8,ht=typeof self=="object"?self:globalThis,ys=(e,n)=>{const t=(r,o)=>(e.set(o,r),r),a=r=>{if(e.has(r))return e.get(r);const[o,i]=n[r];switch(o){case Ze:case ia:return t(i,r);case je:{const s=t([],r);for(const c of i)s.push(a(c));return s}case $e:{const s=t({},r);for(const[c,l]of i)s[a(c)]=a(l);return s}case qn:return t(new Date(i),r);case Dn:{const{source:s,flags:c}=i;return t(new RegExp(s,c),r)}case Nn:{const s=t(new Map,r);for(const[c,l]of i)s.set(a(c),a(l));return s}case zn:{const s=t(new Set,r);for(const c of i)s.add(a(c));return s}case sa:{const{name:s,message:c}=i;return t(new ht[s](c),r)}case la:return t(BigInt(i),r);case"BigInt":return t(Object(BigInt(i)),r);case"ArrayBuffer":return t(new Uint8Array(i).buffer,i);case"DataView":{const{buffer:s}=new Uint8Array(i);return t(new DataView(s),i)}}return t(new ht[o](i),r)};return a},gt=e=>ys(new Map,e)(0),Ae="",{toString:bs}={},{keys:xs}=Object,Fe=e=>{const n=typeof e;if(n!=="object"||!e)return[Ze,n];const t=bs.call(e).slice(8,-1);switch(t){case"Array":return[je,Ae];case"Object":return[$e,Ae];case"Date":return[qn,Ae];case"RegExp":return[Dn,Ae];case"Map":return[Nn,Ae];case"Set":return[zn,Ae];case"DataView":return[je,t]}return t.includes("Array")?[je,t]:t.includes("Error")?[sa,t]:[$e,t]},Qe=([e,n])=>e===Ze&&(n==="function"||n==="symbol"),vs=(e,n,t,a)=>{const r=(i,s)=>{const c=a.push(i)-1;return t.set(s,c),c},o=i=>{if(t.has(i))return t.get(i);let[s,c]=Fe(i);switch(s){case Ze:{let u=i;switch(c){case"bigint":s=la,u=i.toString();break;case"function":case"symbol":if(e)throw new TypeError("unable to serialize "+c);u=null;break;case"undefined":return r([ia],i)}return r([s,u],i)}case je:{if(c){let h=i;return c==="DataView"?h=new Uint8Array(i.buffer):c==="ArrayBuffer"&&(h=new Uint8Array(i)),r([c,[...h]],i)}const u=[],p=r([s,u],i);for(const h of i)u.push(o(h));return p}case $e:{if(c)switch(c){case"BigInt":return r([c,i.toString()],i);case"Boolean":case"Number":case"String":return r([c,i.valueOf()],i)}if(n&&"toJSON"in i)return o(i.toJSON());const u=[],p=r([s,u],i);for(const h of xs(i))(e||!Qe(Fe(i[h])))&&u.push([o(h),o(i[h])]);return p}case qn:return r([s,i.toISOString()],i);case Dn:{const{source:u,flags:p}=i;return r([s,{source:u,flags:p}],i)}case Nn:{const u=[],p=r([s,u],i);for(const[h,d]of i)(e||!(Qe(Fe(h))||Qe(Fe(d))))&&u.push([o(h),o(d)]);return p}case zn:{const u=[],p=r([s,u],i);for(const h of i)(e||!Qe(Fe(h)))&&u.push(o(h));return p}}const{message:l}=i;return r([s,{name:c,message:l}],i)};return o},yt=(e,{json:n,lossy:t}={})=>{const a=[];return vs(!(n||t),!!n,new Map,a)(e),a},Xe=typeof structuredClone=="function"?(e,n)=>n&&("json"in n||"lossy"in n)?gt(yt(e,n)):structuredClone(e):(e,n)=>gt(yt(e,n));function Cs(e,n){const t=[{type:"text",value:"↩"}];return n>1&&t.push({type:"element",tagName:"sup",properties:{},children:[{type:"text",value:String(n)}]}),t}function ks(e,n){return"Back to reference "+(e+1)+(n>1?"-"+n:"")}function Ts(e){const n=typeof e.options.clobberPrefix=="string"?e.options.clobberPrefix:"user-content-",t=e.options.footnoteBackContent||Cs,a=e.options.footnoteBackLabel||ks,r=e.options.footnoteLabel||"Footnotes",o=e.options.footnoteLabelTagName||"h2",i=e.options.footnoteLabelProperties||{className:["sr-only"]},s=[];let c=-1;for(;++c<e.footnoteOrder.length;){const l=e.footnoteById.get(e.footnoteOrder[c]);if(!l)continue;const u=e.all(l),p=String(l.identifier).toUpperCase(),h=Re(p.toLowerCase());let d=0;const v=[],b=e.footnoteCounts.get(p);for(;b!==void 0&&++d<=b;){v.length>0&&v.push({type:"text",value:" "});let T=typeof t=="string"?t:t(c,d);typeof T=="string"&&(T={type:"text",value:T}),v.push({type:"element",tagName:"a",properties:{href:"#"+n+"fnref-"+h+(d>1?"-"+d:""),dataFootnoteBackref:"",ariaLabel:typeof a=="string"?a:a(c,d),className:["data-footnote-backref"]},children:Array.isArray(T)?T:[T]})}const S=u[u.length-1];if(S&&S.type==="element"&&S.tagName==="p"){const T=S.children[S.children.length-1];T&&T.type==="text"?T.value+=" ":S.children.push({type:"text",value:" "}),S.children.push(...v)}else u.push(...v);const g={type:"element",tagName:"li",properties:{id:n+"fn-"+h},children:e.wrap(u,!0)};e.patch(l,g),s.push(g)}if(s.length!==0)return{type:"element",tagName:"section",properties:{dataFootnotes:!0,className:["footnotes"]},children:[{type:"element",tagName:o,properties:{...Xe(i),id:"footnote-label"},children:[{type:"text",value:r}]},{type:"text",value:`
`},{type:"element",tagName:"ol",properties:{},children:e.wrap(s,!0)},{type:"text",value:`
`}]}}const ua=function(e){if(e==null)return ws;if(typeof e=="function")return en(e);if(typeof e=="object")return Array.isArray(e)?Ss(e):As(e);if(typeof e=="string")return Is(e);throw new Error("Expected function, string, or object as test")};function Ss(e){const n=[];let t=-1;for(;++t<e.length;)n[t]=ua(e[t]);return en(a);function a(...r){let o=-1;for(;++o<n.length;)if(n[o].apply(this,r))return!0;return!1}}function As(e){const n=e;return en(t);function t(a){const r=a;let o;for(o in e)if(r[o]!==n[o])return!1;return!0}}function Is(e){return en(n);function n(t){return t&&t.type===e}}function en(e){return n;function n(t,a,r){return!!(Es(t)&&e.call(this,t,typeof a=="number"?a:void 0,r||void 0))}}function ws(){return!0}function Es(e){return e!==null&&typeof e=="object"&&"type"in e}const ca=[],Rs=!0,bt=!1,Ms="skip";function Ls(e,n,t,a){let r;typeof n=="function"&&typeof t!="function"?(a=t,t=n):r=n;const o=ua(r),i=a?-1:1;s(e,void 0,[])();function s(c,l,u){const p=c&&typeof c=="object"?c:{};if(typeof p.type=="string"){const d=typeof p.tagName=="string"?p.tagName:typeof p.name=="string"?p.name:void 0;Object.defineProperty(h,"name",{value:"node ("+(c.type+(d?"<"+d+">":""))+")"})}return h;function h(){let d=ca,v,b,S;if((!n||o(c,l,u[u.length-1]||void 0))&&(d=Ps(t(c,u)),d[0]===bt))return d;if("children"in c&&c.children){const g=c;if(g.children&&d[0]!==Ms)for(b=(a?g.children.length:-1)+i,S=u.concat(g);b>-1&&b<g.children.length;){const T=g.children[b];if(v=s(T,b,S)(),v[0]===bt)return v;b=typeof v[1]=="number"?v[1]:b+i}}return d}}}function Ps(e){return Array.isArray(e)?e:typeof e=="number"?[Rs,e]:e==null?ca:[e]}function da(e,n,t,a){let r,o,i;typeof n=="function"?(o=void 0,i=n,r=t):(o=n,i=t,r=a),Ls(e,o,s,r);function s(c,l){const u=l[l.length-1],p=u?u.children.indexOf(c):void 0;return i(c,p,u)}}const Cn={}.hasOwnProperty,Os={};function qs(e,n){const t=n||Os,a=new Map,r=new Map,o=new Map,i={...gs,...t.handlers},s={all:l,applyData:Ns,definitionById:a,footnoteById:r,footnoteCounts:o,footnoteOrder:[],handlers:i,one:c,options:t,patch:Ds,wrap:Fs};return da(e,function(u){if(u.type==="definition"||u.type==="footnoteDefinition"){const p=u.type==="definition"?a:r,h=String(u.identifier).toUpperCase();p.has(h)||p.set(h,u)}}),s;function c(u,p){const h=u.type,d=s.handlers[h];if(Cn.call(s.handlers,h)&&d)return d(s,u,p);if(s.options.passThrough&&s.options.passThrough.includes(h)){if("children"in u){const{children:b,...S}=u,g=Xe(S);return g.children=s.all(u),g}return Xe(u)}return(s.options.unknownHandler||zs)(s,u,p)}function l(u){const p=[];if("children"in u){const h=u.children;let d=-1;for(;++d<h.length;){const v=s.one(h[d],u);if(v){if(d&&h[d-1].type==="break"&&(!Array.isArray(v)&&v.type==="text"&&(v.value=xt(v.value)),!Array.isArray(v)&&v.type==="element")){const b=v.children[0];b&&b.type==="text"&&(b.value=xt(b.value))}Array.isArray(v)?p.push(...v):p.push(v)}}}return p}}function Ds(e,n){e.position&&(n.position=yr(e))}function Ns(e,n){let t=n;if(e&&e.data){const a=e.data.hName,r=e.data.hChildren,o=e.data.hProperties;if(typeof a=="string")if(t.type==="element")t.tagName=a;else{const i="children"in t?t.children:[t];t={type:"element",tagName:a,properties:{},children:i}}t.type==="element"&&o&&Object.assign(t.properties,Xe(o)),"children"in t&&t.children&&r!==null&&r!==void 0&&(t.children=r)}return t}function zs(e,n){const t=n.data||{},a="value"in n&&!(Cn.call(t,"hProperties")||Cn.call(t,"hChildren"))?{type:"text",value:n.value}:{type:"element",tagName:"div",properties:{},children:e.all(n)};return e.patch(n,a),e.applyData(n,a)}function Fs(e,n){const t=[];let a=-1;for(n&&t.push({type:"text",value:`
`});++a<e.length;)a&&t.push({type:"text",value:`
`}),t.push(e[a]);return n&&e.length>0&&t.push({type:"text",value:`
`}),t}function xt(e){let n=0,t=e.charCodeAt(n);for(;t===9||t===32;)n++,t=e.charCodeAt(n);return e.slice(n)}function vt(e,n){const t=qs(e,n),a=t.one(e,void 0),r=Ts(t),o=Array.isArray(a)?{type:"root",children:a}:a||{type:"root",children:[]};return r&&o.children.push({type:"text",value:`
`},r),o}function Bs(e,n){return e&&"run"in e?async function(t,a){const r=vt(t,{file:a,...n});await e.run(r,a)}:function(t,a){return vt(t,{file:a,...e||n})}}function Ct(e){if(e)throw e}var sn,kt;function _s(){if(kt)return sn;kt=1;var e=Object.prototype.hasOwnProperty,n=Object.prototype.toString,t=Object.defineProperty,a=Object.getOwnPropertyDescriptor,r=function(l){return typeof Array.isArray=="function"?Array.isArray(l):n.call(l)==="[object Array]"},o=function(l){if(!l||n.call(l)!=="[object Object]")return!1;var u=e.call(l,"constructor"),p=l.constructor&&l.constructor.prototype&&e.call(l.constructor.prototype,"isPrototypeOf");if(l.constructor&&!u&&!p)return!1;var h;for(h in l);return typeof h>"u"||e.call(l,h)},i=function(l,u){t&&u.name==="__proto__"?t(l,u.name,{enumerable:!0,configurable:!0,value:u.newValue,writable:!0}):l[u.name]=u.newValue},s=function(l,u){if(u==="__proto__")if(e.call(l,u)){if(a)return a(l,u).value}else return;return l[u]};return sn=function c(){var l,u,p,h,d,v,b=arguments[0],S=1,g=arguments.length,T=!1;for(typeof b=="boolean"&&(T=b,b=arguments[1]||{},S=2),(b==null||typeof b!="object"&&typeof b!="function")&&(b={});S<g;++S)if(l=arguments[S],l!=null)for(u in l)p=s(b,u),h=s(l,u),b!==h&&(T&&h&&(o(h)||(d=r(h)))?(d?(d=!1,v=p&&r(p)?p:[]):v=p&&o(p)?p:{},i(b,{name:u,newValue:c(T,v,h)})):typeof h<"u"&&i(b,{name:u,newValue:h}));return b},sn}var js=_s();const ln=Rt(js);function kn(e){if(typeof e!="object"||e===null)return!1;const n=Object.getPrototypeOf(e);return(n===null||n===Object.prototype||Object.getPrototypeOf(n)===null)&&!(Symbol.toStringTag in e)&&!(Symbol.iterator in e)}function Us(){const e=[],n={run:t,use:a};return n;function t(...r){let o=-1;const i=r.pop();if(typeof i!="function")throw new TypeError("Expected function as last argument, not "+i);s(null,...r);function s(c,...l){const u=e[++o];let p=-1;if(c){i(c);return}for(;++p<r.length;)(l[p]===null||l[p]===void 0)&&(l[p]=r[p]);r=l,u?Vs(u,s)(...l):i(null,...l)}}function a(r){if(typeof r!="function")throw new TypeError("Expected `middelware` to be a function, not "+r);return e.push(r),n}}function Vs(e,n){let t;return a;function a(...i){const s=e.length>i.length;let c;s&&i.push(r);try{c=e.apply(this,i)}catch(l){const u=l;if(s&&t)throw u;return r(u)}s||(c&&c.then&&typeof c.then=="function"?c.then(o,r):c instanceof Error?r(c):o(c))}function r(i,...s){t||(t=!0,n(i,...s))}function o(i){r(null,i)}}const le={basename:Hs,dirname:Gs,extname:Ws,join:Qs,sep:"/"};function Hs(e,n){if(n!==void 0&&typeof n!="string")throw new TypeError('"ext" argument must be a string');He(e);let t=0,a=-1,r=e.length,o;if(n===void 0||n.length===0||n.length>e.length){for(;r--;)if(e.codePointAt(r)===47){if(o){t=r+1;break}}else a<0&&(o=!0,a=r+1);return a<0?"":e.slice(t,a)}if(n===e)return"";let i=-1,s=n.length-1;for(;r--;)if(e.codePointAt(r)===47){if(o){t=r+1;break}}else i<0&&(o=!0,i=r+1),s>-1&&(e.codePointAt(r)===n.codePointAt(s--)?s<0&&(a=r):(s=-1,a=i));return t===a?a=i:a<0&&(a=e.length),e.slice(t,a)}function Gs(e){if(He(e),e.length===0)return".";let n=-1,t=e.length,a;for(;--t;)if(e.codePointAt(t)===47){if(a){n=t;break}}else a||(a=!0);return n<0?e.codePointAt(0)===47?"/":".":n===1&&e.codePointAt(0)===47?"//":e.slice(0,n)}function Ws(e){He(e);let n=e.length,t=-1,a=0,r=-1,o=0,i;for(;n--;){const s=e.codePointAt(n);if(s===47){if(i){a=n+1;break}continue}t<0&&(i=!0,t=n+1),s===46?r<0?r=n:o!==1&&(o=1):r>-1&&(o=-1)}return r<0||t<0||o===0||o===1&&r===t-1&&r===a+1?"":e.slice(r,t)}function Qs(...e){let n=-1,t;for(;++n<e.length;)He(e[n]),e[n]&&(t=t===void 0?e[n]:t+"/"+e[n]);return t===void 0?".":Js(t)}function Js(e){He(e);const n=e.codePointAt(0)===47;let t=Ys(e,!n);return t.length===0&&!n&&(t="."),t.length>0&&e.codePointAt(e.length-1)===47&&(t+="/"),n?"/"+t:t}function Ys(e,n){let t="",a=0,r=-1,o=0,i=-1,s,c;for(;++i<=e.length;){if(i<e.length)s=e.codePointAt(i);else{if(s===47)break;s=47}if(s===47){if(!(r===i-1||o===1))if(r!==i-1&&o===2){if(t.length<2||a!==2||t.codePointAt(t.length-1)!==46||t.codePointAt(t.length-2)!==46){if(t.length>2){if(c=t.lastIndexOf("/"),c!==t.length-1){c<0?(t="",a=0):(t=t.slice(0,c),a=t.length-1-t.lastIndexOf("/")),r=i,o=0;continue}}else if(t.length>0){t="",a=0,r=i,o=0;continue}}n&&(t=t.length>0?t+"/..":"..",a=2)}else t.length>0?t+="/"+e.slice(r+1,i):t=e.slice(r+1,i),a=i-r-1;r=i,o=0}else s===46&&o>-1?o++:o=-1}return t}function He(e){if(typeof e!="string")throw new TypeError("Path must be a string. Received "+JSON.stringify(e))}const $s={cwd:Xs};function Xs(){return"/"}function Tn(e){return!!(e!==null&&typeof e=="object"&&"href"in e&&e.href&&"protocol"in e&&e.protocol&&e.auth===void 0)}function Ks(e){if(typeof e=="string")e=new URL(e);else if(!Tn(e)){const n=new TypeError('The "path" argument must be of type string or an instance of URL. Received `'+e+"`");throw n.code="ERR_INVALID_ARG_TYPE",n}if(e.protocol!=="file:"){const n=new TypeError("The URL must be of scheme file");throw n.code="ERR_INVALID_URL_SCHEME",n}return Zs(e)}function Zs(e){if(e.hostname!==""){const a=new TypeError('File URL host must be "localhost" or empty on darwin');throw a.code="ERR_INVALID_FILE_URL_HOST",a}const n=e.pathname;let t=-1;for(;++t<n.length;)if(n.codePointAt(t)===37&&n.codePointAt(t+1)===50){const a=n.codePointAt(t+2);if(a===70||a===102){const r=new TypeError("File URL path must not include encoded / characters");throw r.code="ERR_INVALID_FILE_URL_PATH",r}}return decodeURIComponent(n)}const un=["history","path","basename","stem","extname","dirname"];class pa{constructor(n){let t;n?Tn(n)?t={path:n}:typeof n=="string"||el(n)?t={value:n}:t=n:t={},this.cwd="cwd"in t?"":$s.cwd(),this.data={},this.history=[],this.messages=[],this.value,this.map,this.result,this.stored;let a=-1;for(;++a<un.length;){const o=un[a];o in t&&t[o]!==void 0&&t[o]!==null&&(this[o]=o==="history"?[...t[o]]:t[o])}let r;for(r in t)un.includes(r)||(this[r]=t[r])}get basename(){return typeof this.path=="string"?le.basename(this.path):void 0}set basename(n){dn(n,"basename"),cn(n,"basename"),this.path=le.join(this.dirname||"",n)}get dirname(){return typeof this.path=="string"?le.dirname(this.path):void 0}set dirname(n){Tt(this.basename,"dirname"),this.path=le.join(n||"",this.basename)}get extname(){return typeof this.path=="string"?le.extname(this.path):void 0}set extname(n){if(cn(n,"extname"),Tt(this.dirname,"extname"),n){if(n.codePointAt(0)!==46)throw new Error("`extname` must start with `.`");if(n.includes(".",1))throw new Error("`extname` cannot contain multiple dots")}this.path=le.join(this.dirname,this.stem+(n||""))}get path(){return this.history[this.history.length-1]}set path(n){Tn(n)&&(n=Ks(n)),dn(n,"path"),this.path!==n&&this.history.push(n)}get stem(){return typeof this.path=="string"?le.basename(this.path,this.extname):void 0}set stem(n){dn(n,"stem"),cn(n,"stem"),this.path=le.join(this.dirname||"",n+(this.extname||""))}fail(n,t,a){const r=this.message(n,t,a);throw r.fatal=!0,r}info(n,t,a){const r=this.message(n,t,a);return r.fatal=void 0,r}message(n,t,a){const r=new $(n,t,a);return this.path&&(r.name=this.path+":"+r.name,r.file=this.path),r.fatal=!1,this.messages.push(r),r}toString(n){return this.value===void 0?"":typeof this.value=="string"?this.value:new TextDecoder(n||void 0).decode(this.value)}}function cn(e,n){if(e&&e.includes(le.sep))throw new Error("`"+n+"` cannot be a path: did not expect `"+le.sep+"`")}function dn(e,n){if(!e)throw new Error("`"+n+"` cannot be empty")}function Tt(e,n){if(!e)throw new Error("Setting `"+n+"` requires `path` to be set too")}function el(e){return!!(e&&typeof e=="object"&&"byteLength"in e&&"byteOffset"in e)}const nl=function(e){const a=this.constructor.prototype,r=a[e],o=function(){return r.apply(o,arguments)};return Object.setPrototypeOf(o,a),o},tl={}.hasOwnProperty;class Fn extends nl{constructor(){super("copy"),this.Compiler=void 0,this.Parser=void 0,this.attachers=[],this.compiler=void 0,this.freezeIndex=-1,this.frozen=void 0,this.namespace={},this.parser=void 0,this.transformers=Us()}copy(){const n=new Fn;let t=-1;for(;++t<this.attachers.length;){const a=this.attachers[t];n.use(...a)}return n.data(ln(!0,{},this.namespace)),n}data(n,t){return typeof n=="string"?arguments.length===2?(fn("data",this.frozen),this.namespace[n]=t,this):tl.call(this.namespace,n)&&this.namespace[n]||void 0:n?(fn("data",this.frozen),this.namespace=n,this):this.namespace}freeze(){if(this.frozen)return this;const n=this;for(;++this.freezeIndex<this.attachers.length;){const[t,...a]=this.attachers[this.freezeIndex];if(a[0]===!1)continue;a[0]===!0&&(a[0]=void 0);const r=t.call(n,...a);typeof r=="function"&&this.transformers.use(r)}return this.frozen=!0,this.freezeIndex=Number.POSITIVE_INFINITY,this}parse(n){this.freeze();const t=Je(n),a=this.parser||this.Parser;return pn("parse",a),a(String(t),t)}process(n,t){const a=this;return this.freeze(),pn("process",this.parser||this.Parser),mn("process",this.compiler||this.Compiler),t?r(void 0,t):new Promise(r);function r(o,i){const s=Je(n),c=a.parse(s);a.run(c,s,function(u,p,h){if(u||!p||!h)return l(u);const d=p,v=a.stringify(d,h);ol(v)?h.value=v:h.result=v,l(u,h)});function l(u,p){u||!p?i(u):o?o(p):t(void 0,p)}}}processSync(n){let t=!1,a;return this.freeze(),pn("processSync",this.parser||this.Parser),mn("processSync",this.compiler||this.Compiler),this.process(n,r),At("processSync","process",t),a;function r(o,i){t=!0,Ct(o),a=i}}run(n,t,a){St(n),this.freeze();const r=this.transformers;return!a&&typeof t=="function"&&(a=t,t=void 0),a?o(void 0,a):new Promise(o);function o(i,s){const c=Je(t);r.run(n,c,l);function l(u,p,h){const d=p||n;u?s(u):i?i(d):a(void 0,d,h)}}}runSync(n,t){let a=!1,r;return this.run(n,t,o),At("runSync","run",a),r;function o(i,s){Ct(i),r=s,a=!0}}stringify(n,t){this.freeze();const a=Je(t),r=this.compiler||this.Compiler;return mn("stringify",r),St(n),r(n,a)}use(n,...t){const a=this.attachers,r=this.namespace;if(fn("use",this.frozen),n!=null)if(typeof n=="function")c(n,t);else if(typeof n=="object")Array.isArray(n)?s(n):i(n);else throw new TypeError("Expected usable value, not `"+n+"`");return this;function o(l){if(typeof l=="function")c(l,[]);else if(typeof l=="object")if(Array.isArray(l)){const[u,...p]=l;c(u,p)}else i(l);else throw new TypeError("Expected usable value, not `"+l+"`")}function i(l){if(!("plugins"in l)&&!("settings"in l))throw new Error("Expected usable value but received an empty preset, which is probably a mistake: presets typically come with `plugins` and sometimes with `settings`, but this has neither");s(l.plugins),l.settings&&(r.settings=ln(!0,r.settings,l.settings))}function s(l){let u=-1;if(l!=null)if(Array.isArray(l))for(;++u<l.length;){const p=l[u];o(p)}else throw new TypeError("Expected a list of plugins, not `"+l+"`")}function c(l,u){let p=-1,h=-1;for(;++p<a.length;)if(a[p][0]===l){h=p;break}if(h===-1)a.push([l,...u]);else if(u.length>0){let[d,...v]=u;const b=a[h][1];kn(b)&&kn(d)&&(d=ln(!0,b,d)),a[h]=[l,d,...v]}}}}const al=new Fn().freeze();function pn(e,n){if(typeof n!="function")throw new TypeError("Cannot `"+e+"` without `parser`")}function mn(e,n){if(typeof n!="function")throw new TypeError("Cannot `"+e+"` without `compiler`")}function fn(e,n){if(n)throw new Error("Cannot call `"+e+"` on a frozen processor.\nCreate a new processor first, by calling it: use `processor()` instead of `processor`.")}function St(e){if(!kn(e)||typeof e.type!="string")throw new TypeError("Expected node, got `"+e+"`")}function At(e,n,t){if(!t)throw new Error("`"+e+"` finished async. Use `"+n+"` instead")}function Je(e){return rl(e)?e:new pa(e)}function rl(e){return!!(e&&typeof e=="object"&&"message"in e&&"messages"in e)}function ol(e){return typeof e=="string"||il(e)}function il(e){return!!(e&&typeof e=="object"&&"byteLength"in e&&"byteOffset"in e)}const sl="https://github.com/remarkjs/react-markdown/blob/main/changelog.md",It=[],wt={allowDangerousHtml:!0},ll=/^(https?|ircs?|mailto|xmpp)$/i,ul=[{from:"astPlugins",id:"remove-buggy-html-in-markdown-parser"},{from:"allowDangerousHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"allowNode",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowElement"},{from:"allowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"allowedElements"},{from:"className",id:"remove-classname"},{from:"disallowedTypes",id:"replace-allownode-allowedtypes-and-disallowedtypes",to:"disallowedElements"},{from:"escapeHtml",id:"remove-buggy-html-in-markdown-parser"},{from:"includeElementIndex",id:"#remove-includeelementindex"},{from:"includeNodeIndex",id:"change-includenodeindex-to-includeelementindex"},{from:"linkTarget",id:"remove-linktarget"},{from:"plugins",id:"change-plugins-to-remarkplugins",to:"remarkPlugins"},{from:"rawSourcePos",id:"#remove-rawsourcepos"},{from:"renderers",id:"change-renderers-to-components",to:"components"},{from:"source",id:"change-source-to-children",to:"children"},{from:"sourcePos",id:"#remove-sourcepos"},{from:"transformImageUri",id:"#add-urltransform",to:"urlTransform"},{from:"transformLinkUri",id:"#add-urltransform",to:"urlTransform"}];function cl(e){const n=dl(e),t=pl(e);return ml(n.runSync(n.parse(t),t),e)}function dl(e){const n=e.rehypePlugins||It,t=e.remarkPlugins||It,a=e.remarkRehypeOptions?{...e.remarkRehypeOptions,...wt}:wt;return al().use(Hi).use(t).use(Bs,a).use(n)}function pl(e){const n=e.children||"",t=new pa;return typeof n=="string"&&(t.value=n),t}function ml(e,n){const t=n.allowedElements,a=n.allowElement,r=n.components,o=n.disallowedElements,i=n.skipHtml,s=n.unwrapDisallowed,c=n.urlTransform||fl;for(const u of ul)Object.hasOwn(n,u.from)&&(""+u.from+(u.to?"use `"+u.to+"` instead":"remove it")+sl+u.id,void 0);return da(e,l),kr(e,{Fragment:q.Fragment,components:r,ignoreInvalidStyle:!0,jsx:q.jsx,jsxs:q.jsxs,passKeys:!0,passNode:!0});function l(u,p,h){if(u.type==="raw"&&h&&typeof p=="number")return i?h.children.splice(p,1):h.children[p]={type:"text",value:u.value},p;if(u.type==="element"){let d;for(d in an)if(Object.hasOwn(an,d)&&Object.hasOwn(u.properties,d)){const v=u.properties[d],b=an[d];(b===null||b.includes(u.tagName))&&(u.properties[d]=c(String(v||""),d,u))}}if(u.type==="element"){let d=t?!t.includes(u.tagName):o?o.includes(u.tagName):!1;if(!d&&a&&typeof p=="number"&&(d=!a(u,p,h)),d&&h&&typeof p=="number")return s&&u.children?h.children.splice(p,1,...u.children):h.children.splice(p,1),p}}}function fl(e){const n=e.indexOf(":"),t=e.indexOf("?"),a=e.indexOf("#"),r=e.indexOf("/");return n===-1||r!==-1&&n>r||t!==-1&&n>t||a!==-1&&n>a||ll.test(e.slice(0,n))?e:""}const Sn={},hl=1e3*60*5,gl=(e,n)=>{Sn[e]={content:n,timestamp:Date.now()}},yl=e=>{const n=Sn[e];return n?Date.now()-n.timestamp>hl?(delete Sn[e],null):n.content:null},Et=Object.assign({"../blog/posts/bc-al-advanced-debugging.en.md":Pa,"../blog/posts/bc-al-advanced-debugging.pt.md":Oa,"../blog/posts/bc-al-advanced-integrations.en.md":qa,"../blog/posts/bc-al-advanced-integrations.pt.md":Da,"../blog/posts/bc-al-data-transactions.en.md":Na,"../blog/posts/bc-al-data-transactions.pt.md":za,"../blog/posts/bc-al-interfaces.en.md":Fa,"../blog/posts/bc-al-interfaces.pt.md":Ba,"../blog/posts/bc-al-performance-killers.en.md":_a,"../blog/posts/bc-al-performance-killers.pt.md":ja,"../blog/posts/bc-al-upgrade-gauntlet.en.md":Ua,"../blog/posts/bc-al-upgrade-gauntlet.pt.md":Va,"../blog/posts/bc-events-subscribers.en.md":Ha,"../blog/posts/bc-events-subscribers.pt.md":Ga,"../blog/posts/getting-started-al-dev.en.md":Wa,"../blog/posts/getting-started-al-dev.pt.md":Qa}),bl=()=>q.jsxs("div",{className:"animate-pulse space-y-4",children:[q.jsx("div",{className:"h-8 bg-gray-200 rounded w-3/4"}),q.jsx("div",{className:"h-4 bg-gray-200 rounded w-1/4"}),q.jsxs("div",{className:"space-y-3",children:[q.jsx("div",{className:"h-4 bg-gray-200 rounded"}),q.jsx("div",{className:"h-4 bg-gray-200 rounded"}),q.jsx("div",{className:"h-4 bg-gray-200 rounded w-5/6"})]})]});function kl(){return q.jsx(ka,{fallback:q.jsx("div",{className:"max-w-3xl mx-auto",children:q.jsx(Mt,{onRetry:()=>window.location.reload()})}),children:q.jsx(xl,{})})}function xl(){const{i18n:e}=Ta(),n=e.language,{postId:t}=Sa(),a=Aa.find(v=>v.id===t),[r,o]=Oe.useState(null),[i,s]=Oe.useState(null),[c,l]=Oe.useState(null),{error:u,isLoading:p,executeWithErrorHandling:h}=Ra({onError:v=>{console.error("Error loading blog post:",v)},retryAttempts:3,componentName:"BlogPostContent",context:{postId:t,language:n}});if(Oe.useEffect(()=>{(async()=>{await h(async()=>{if(!t||!a)throw new qe("NOT_FOUND","Post not found");const b=`${t}-${n}`,S=yl(b);if(S){o(S),s(a.title[n]),l(a.date);return}if(!navigator.onLine)throw new qe("NETWORK_ERROR","No internet connection");const g=`../blog/posts/${t}.${n}.md`,T=Et[g];if(!T)throw console.error("Available posts:",Object.keys(Et)),new qe("NOT_FOUND",`Blog post file not found: ${g}`);try{const A=T;gl(b,A),o(A),s(a.title[n]),l(a.date)}catch(A){throw A instanceof qe?A:new qe("NETWORK_ERROR","Failed to load blog post")}})})()},[t,n,a,h]),Oe.useEffect(()=>{document.title="Blog Post | Ricardo Carvalho - D365 BC Developer";const v=document.querySelector('meta[name="description"]');v&&v.setAttribute("content","Read a blog post by Ricardo Carvalho about Dynamics 365 Business Central, AL development, and ERP best practices.");let b=document.getElementById("blogpost-jsonld");return b||(b=document.createElement("script"),b.type="application/ld+json",b.id="blogpost-jsonld",document.head.appendChild(b)),b.textContent=JSON.stringify({"@context":"https://schema.org","@type":"BlogPosting",headline:document.title,author:{"@type":"Person",name:"Ricardo Carvalho",url:"https://mrricardocarvalho.github.io/my-cv/"},url:window.location.href}),()=>{b&&b.parentNode&&b.parentNode.removeChild(b)}},[]),p)return q.jsx(bl,{});if((u==null?void 0:u.type)==="NETWORK_ERROR")return q.jsx(Mt,{onRetry:()=>window.location.reload()});if((u==null?void 0:u.type)==="NOT_FOUND")return q.jsx(Ma,{});if(u)return q.jsx(La,{error:u,onRetry:()=>window.location.reload()});const d={h1:function({node:b,className:S,children:g,...T}){return q.jsx("h1",{className:`text-3xl font-bold text-gray-800 mb-4 ${S||""}`,...T,children:g})},h2:function({node:b,className:S,children:g,...T}){return q.jsx("h2",{className:`text-2xl font-semibold text-gray-700 mb-3 ${S||""}`,...T,children:g})},p:function({node:b,className:S,children:g,...T}){return q.jsx("p",{className:`prose-code:font-mono text-gray-600 mb-4 leading-relaxed ${S||""}`,...T,children:g})},strong:function({node:b,className:S,children:g,...T}){return q.jsx("strong",{className:`text-gray-700 font-medium ${S||""}`,...T,children:g})},em:function({node:b,className:S,children:g,...T}){return q.jsx("em",{className:`text-gray-600 ${S||""}`,...T,children:g})},a:function({node:b,href:S,className:g,children:T,...A}){return q.jsx("a",{href:S,className:`text-blue-800 hover:text-blue-900 underline font-medium ${g||""}`,...A,children:T})},img:function({node:b,src:S,alt:g,className:T,...A}){return q.jsx(Ea,{src:S||"",alt:g||"",className:`rounded-lg max-w-full h-auto my-4 ${T||""}`,fallback:g||"Image",onLoadError:B=>{console.error(`Failed to load blog post image (${g}):`,B)},...A})},code:function({node:b,className:S,children:g,...T}){return q.jsx("code",{className:`text-blue-600 bg-blue-50 font-mono px-1.5 py-0.5 rounded-sm ${S||""}`,...T,children:g})},pre:function({node:b,className:S,children:g,...T}){return q.jsx("pre",{className:`bg-slate-50 text-slate-700 p-4 rounded-lg overflow-x-auto border border-slate-200 ${S||""}`,...T,children:g})},ul:function({node:b,className:S,children:g,...T}){return q.jsx("ul",{className:`list-disc list-outside pl-6 space-y-2 mb-4 text-gray-600 ${S||""}`,...T,children:g})},li:function({node:b,className:S,children:g,...T}){return q.jsx("li",{className:`text-gray-900 ${S||""}`,...T,children:g})}};return q.jsx("div",{className:"max-w-3xl mx-auto",children:q.jsxs("article",{children:[q.jsxs(Ia,{to:"/blog",className:"inline-flex items-center text-blue-800 hover:text-blue-900 underline mb-6",children:[q.jsx("i",{className:"fas fa-arrow-left mr-2"}),wa.blog[n]]}),i&&q.jsxs("header",{className:"mb-8",children:[q.jsx("h1",{className:"text-3xl font-bold text-gray-900 mb-2",children:i}),c&&q.jsx("time",{className:"text-gray-800",children:c})]}),q.jsx("div",{className:"prose prose-lg max-w-none",children:r&&q.jsx("div",{className:"markdown-content",children:q.jsx(cl,{components:d,children:r})})})]})})}export{kl as default};
