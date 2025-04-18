No nosso [post anterior sobre Introdução ao Desenvolvimento AL](/blog/getting-started-al-dev), abordámos os conceitos centrais da construção de extensões para o Dynamics 365 Business Central. Agora, vamos explorar um dos mecanismos mais poderosos para criar código **desacoplado** e de **fácil manutenção**: **Eventos e Subscritores**.

## O Problema da Modificação Direta (A Forma Antiga)

Em versões mais antigas do NAV (C/AL), a personalização envolvia frequentemente a modificação direta de objetos da aplicação base (tabelas, páginas, codeunits). Embora eficaz, isto criava desafios significativos durante as atualizações, pois o código personalizado precisava ser manualmente mesclado com o novo código da aplicação base – um processo demorado e propenso a erros.

## A Solução: Arquitetura Orientada a Eventos

O Business Central adota um modelo orientado a eventos. Em vez de alterar o código base, a Microsoft (e outros developers de extensões) *publicam* **eventos** em pontos específicos na execução do código (ex: antes de validar um campo, após lançar um documento, ao inicializar uma página).

A sua extensão personalizada pode então *subscrever* a estes eventos. Quando um evento é disparado (publicado), todos os seus subscritores são automaticamente executados.

## Componentes Chave

1.  **Publicadores de Eventos (Event Publishers):** São funções (tipicamente dentro de codeunits da aplicação base ou declaradas em triggers de tabelas/páginas) marcadas com atributos específicos (`[IntegrationEvent(...)]`, `[BusinessEvent(...)]`). Eles definem o *sinal* de que algo aconteceu e especificam quaisquer parâmetros (dados) passados juntamente com o evento.
2.  **Subscritores de Eventos (Event Subscribers):** São funções dentro das codeunits da sua extensão marcadas com o atributo `[EventSubscriber(...)]`. Este atributo especifica:
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

Imagine que precisa executar lógica personalizada *depois* do campo `Morada` (Address) na ficha de Cliente ser validado.

1.  **Encontrar o Evento:** Procure por um publicador de evento no trigger do campo `Morada` da tabela `Cliente`, como `OnAfterValidateEvent`.
2.  **Criar uma Codeunit:** Na sua extensão, crie uma nova codeunit (ex: `MeusSubscritoresCliente`).
3.  **Criar uma Função Subscritora:** Dentro da codeunit, crie uma função:

    ```al
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
    ```
4.  **Implementar:** Empacote e implemente a sua extensão. Agora, sempre que o campo Morada em qualquer registo de Cliente for validado na aplicação base, a sua função `MeuManipuladorValidacaoMoradaCliente` será executada automaticamente.

Eventos e Subscritores são fundamentais para o desenvolvimento moderno do Business Central. Dominá-los permite construir soluções poderosas e integradas, mantendo uma separação limpa do código da aplicação principal.