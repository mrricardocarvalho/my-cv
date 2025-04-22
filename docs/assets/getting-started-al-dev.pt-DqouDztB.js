const e=`Dynamics 365 Business Central offers robust ERP capabilities, mas o seu verdadeiro poder reside na **personalização** através de extensões. A linguagem principal para isto é a **AL (Application Language)**, uma linguagem moderna desenhada especificamente para o desenvolvimento em BC. Vamos mergulhar nos básicos.

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

O desenvolvimento AL abre vastas possibilidades para adaptar o Business Central a necessidades específicas de negócio. Isto é apenas o começo – explore relações entre tabelas, ações, layouts de relatórios, APIs e muito mais!`;export{e as default};
