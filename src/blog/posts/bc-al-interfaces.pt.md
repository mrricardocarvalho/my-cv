# Pensamento de Interface em AL: Desenhar para o Futuro das Suas Extensões BC

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

Imaginem precisar de regras de validação diferentes para diferentes tipos de clientes ou documentos. Sem interfaces, poderiam ter um grande bloco `IF/ELSEIF` ou uma declaração `CASE` complexa a verificar tipos e a chamar diretamente codeunits de validação específicas. Com interfaces, podem definir uma interface `ICustomerValidator` com um método `Validate(Customer: Record Customer)`. Criam diferentes codeunits de validação (por exemplo, `StandardCustomerValidator`, `KeyAccountValidator`), todas implementando esta interface. A vossa lógica central então simplesmente depende de `ICustomerValidator` e recebe a implementação *correta* em tempo de execução.

Outros exemplos principais:
* **Integrações Plugáveis:** Uma interface `IPaymentGateway` com métodos como `ProcessPayment`, `RefundPayment`. Implementações para diferentes fornecedores (`StripePaymentGateway`, `PayPalPaymentGateway`). O vosso código de Encomenda de Venda apenas usa a interface.
* **Cálculos Flexíveis:** Uma interface `ITaxCalculator`. Implementações para diferentes jurisdições fiscais ou regras fiscais complexas.
* **Ações de Workflow Diferentes:** Uma interface `IWorkflowAction` para passos plugáveis num workflow personalizado.

## Desenhar Interfaces Eficazes

Nem todas as interfaces são criadas iguais. Para obter o máximo benefício, sigam estas diretrizes:

* **Mantenham-nas Pequenas e Focadas:** Não criem interfaces gigantes com dezenas de métodos. Agrupem funcionalidades relacionadas em interfaces menores e específicas de função (ISP!). Uma interface para "Validação de Endereço de Cliente" é melhor do que adicionar métodos de endereço a uma interface geral de "Processamento de Cliente".
* **Definam o "Quê", Não o "Como":** Os métodos de interface devem descrever a ação ou a recuperação de dados, não expor detalhes de implementação.
* **Usem Nomes Que Revelem a Intenção:** Nomes de interfaces tipicamente começam com 'I' (por exemplo, `ICustomerValidator`) e os seus métodos devem indicar claramente o seu propósito (`Validate`, `ProcessPayment`).

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

Neste padrão, a `MyCodeunit` não se importa se está a usar a `ImplementationA` ou a `ImplementationB`, desde que obtenha *um* objeto que cumpra o contrato da `MyInterface`. O conhecimento de *qual* implementação usar é externalizado.

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

Comecem a procurar oportunidades para introduzir interfaces. Onde têm declarações `CASE` baseadas em tipos? Onde chamam diretamente codeunits de integração específicas? Estes são candidatos ideais para abstração via interfaces.

Quais são as vossas opiniões sobre o uso de interfaces em AL? Têm achado benéfico nos vossos projetos? Partilhem as vossas experiências abaixo!

---