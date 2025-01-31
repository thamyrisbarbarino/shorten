# URL Shortener API

Uma API para encurtar URLs, registrar usuários e autenticar com JWT.

## Índice

- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando a Aplicação](#executando-a-aplicação)
- [Endpoints](#endpoints)
- [Licença](#licença)

## Tecnologias Utilizadas

- Node.js (v20.17.0)
- Express
- Sequelize (ORM)
- MySQL (Banco de Dados)
- JWT (Json Web Token) para autenticação
- bcrypt para hash de senhas

## Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (v20.17.0)
- [NPM](https://www.npmjs.com/get-npm) (geralmente já incluído com Node.js)
- Um banco de dados (MySQL)

## Instalação

1. Clone este repositório para sua máquina local:

   ```bash
   git clone https://github.com/thamyrisbarbarino/shorten

2. Navegue até o diretório do projeto:
    cd seu-repositorio

3. Instale as dependências necessárias:
    npm install

## Configuração

1. Crie um arquivo .env na raiz do projeto e adicione as variáveis necessárias:
   JWT_SECRET=seu_segredo_aqui
    DATABASE_URL=seu_url_do_banco_de_dados
    BASE_URL=http://localhost:3000

## Executando a Aplicação

1. Inicie a aplicação:
    npm start

2. A API estará disponível em http://localhost:3000.

## Endpoints
 
Registro de Usuário
    * Endpoint: POST /register
    * Descrição: Registra um novo usuário.
    * Body:
        {
        "email": "seu_email@example.com",
        "password": "sua_senha"
        }
    * Resposta:
        {
        "token": "seu_token_jwt"
        }

Encurtar URL
    * Endpoint: POST /shorten
    * Descrição: Encurta uma URL original.
    * Body:
        {
        "originalUrl": "http://example.com"
        }
    * Resposta:
        {
        "originalUrl": "http://example.com",
        "shortUrl": "http://localhost:3000/abc123"
        }

## Licença      

    Este projeto é licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.

