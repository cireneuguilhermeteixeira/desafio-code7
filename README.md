# Desafio Code7

Este repositório é referente a uma aplicação  fron-end, feita em Angular, e a outra feita com NodeJs que se comunicam entre si.
Nesta aplicação, é possível gerenciar dívidas de clientes, sendo possível consultar, criar, editar, excluir essas dívidas. Os clientes são obtidos através de uma API pública chamada JSONPlaceholder.



## Recursos utilizados no desenvolvimento:

### Backend
- Node.Js;
- Express.Js ~ v.4.x;
- Conceitos RestFul;
- MongoDb;
- Mongoose ~5.x;
- JWT;
- JSON data (para retornar os dados);
- PostMan (testar a API criada);
- Mocha;
- Supertest;

### Frontend
- Angular 10;
- Modulos do Material;
- Sweet Alert;
- Interceptors de Requisições;
- Interceptors de Rotas;

## Testando a Aplicação no Postman:

Caso queira testar as API's criadas no projeto, primeiro baixe o [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop).
Depois de realizar o download do Postman, basta agora realizar os passos abaiaxo para 
poder testar cada API criada!


## Executar Localmente

Caso você deseja executar o projeto na sua máquina local, basta seguir os passos abaixo:

## Começando...

Para começar, você deve simplesmente clonar o repositório do projeto na sua máquina e instalar as dependências.

### Pre-Requisitos

Antes de instalar as dependências no projeto, você precisa já ter instalado na sua máquina:

* **Node.Js**: Caso não tenha, basta realizar o download [Aqui](https://nodejs.org/en/)
* **MongoDb**: Caso também não tenha, basta realizar o download [Aqui](https://www.mongodb.com/download-center#community)
* **Angular**: Caso também não tenha, basta realizar o download [Aqui](https://cli.angular.io/)



### Instalando as Dependências Node

Abre o cmd (caso esteja utilizando o Windows) e digite a path do seu projeto

```
    cd path_do_projeto/desafio-code7-node
    npm install
```


### Instalando as Dependências Node

Abre o cmd (caso esteja utilizando o Windows) e digite a path do seu projeto

```
    cd path_do_projeto/desafio-code7-angular
    npm install
```


Após instalado as dependências, vamos rodar ambas as aplicações.

### Executando a Aplicação Node

Vá para o diretório da aplicação desafio-code7-node e execute.

```
node server.js
```


### Executando a Aplicação Angular

Vá para o diretório da aplicação desafio-code7-angular e execute.

```
ng serve
```


Agora, abra a página da aplicação backend em `http://localhost:3000/`. Acesse a parte frontend em `http://localhost:4200/` .   


OBS: No `http://localhost:3000/` você também terá acesso a aplicação front-end, pois ela foi buildada em uma página estática lá dentro.



### Executando Testes Node

Execute o Comando abaixo.
```
npm test
```

