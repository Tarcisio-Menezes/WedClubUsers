# Boas vindas ao repositório do projeto WedClub Users!

Esta é uma aplicação full-stack de gerenciamento de usuários, que permite cadastrar, atualizar, listar e deletar usuários de maneira fácil e intuitiva.

# Tecnologias de back-end

  * Node.js

  * Express

  * MongoDB

# Tecnologias de front-end

  * React.js

  * ContextAPI

  * Hooks

  * CSS

  * Bootstrap

---

## Para executar a aplicação:

1. Clone o repositório:
  * `git clone git@github.com:Tarcisio-Menezes/WedClubUsers.git`
  * Utilizando o terminal, entre na pasta do repositório que você acabou de clonar .
  * Entre na pasta `backend`.


2. Inicie sua instâcia MongoDB:
  * No linux: `sudo systemctl start mongod.service`


3. Instale as dependências e inicialize a aplicação:
  * Instale as dependências:
    * `npm install`
  * Inicie a aplicação:
    * `npm start`
    * A mensagem `conectado na porta 3005` será exibida no terminal


4. Agora vamos iniciar o front:
  * Abra uma nova aba em seu terminal
  * Volte um nível com `cd ..`
  * Entre na pasta `frontend`


5. Instale as dependências e inicialize a aplicação:
    * Instale as dependências:
      * `npm install`
    * Inicie a aplicação:
      * `npm start`
      * Aperte `enter` caso precise iniciar em uma porta diferente da padrão.
      * Uma nova aba de seu navegador será aberta com a aplicação.

## Observações técnicas

1. A conexão com o banco de dados, feita em `/backend/src/models/connection`, por padrão,
utiliza o endpoint `mongodb://localhost`. Você pode utilizar o endpoint que preferir.

 * Se você não possuir o `npm` instalado em sua máquina:
   * Faça o download [aqui](https://www.npmjs.com/package/download)

 * Se você não possuir o `MongoDB` instalado em sua máquina:
   * Faça o download [aqui](https://www.mongodb.com/try/download/community)

## Como usar a aplicação:

* WedClub Users foi projetado para telas convencionais de computadores.

* A aplicação vai iniciar na página principal.

* Para adicionar um novo card de usuário utilize o pequeno formulário na parte superior da tela.
  * No primeiro campo, digite o nome do usuário.
  * No segundo, digite um e-mail válido. Caso o email digitado seja inválido o card de usuário não será criado.
  * No terceiro, digite uma breve descrição do usuário.
  * Em seguida, clique em `Enviar`, caso o email seja válido, um card com as descrições informadas será criado na parte inferior da tela.

* Para adicionar uma foto em um usuário, clique em `Choose File` no card que representa o respectivo usuário, na tela que se abrir escolha uma foto em formato `jpeg` e clique em `Enviar foto`.
  * A página recarregará rapidamente e a foto será renderizada no card.

* Para editar um card de usuário, utilize os campos de formulário da parte superior para fazer as alterações necessárias e em seguida clique em `Editar` no card em que deseja aplicar os novos valores.
  * Atenção: não é possível alterar o email de cadastro

* Para excluir um usuário, apenas clique no botão `Deletar` no card de usuário.

---
