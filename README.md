# [Trybe Project](https://www.betrybe.com/)  - Trybe Futebol Clube

## 💻 What is it about?

TFC is an website about football matches and ranking. If you are logged in, it is possible to edit and register new games, as long as you are an admin user (authentication and authorization).

#### Table of Contents

- [Dockerization](#dockerization)
- [Data Modeling - ORM](#data-modeling)
- [API RESTful Development](#api-restful-development)
- [CRUD with TypeScript](#crud-with-typescript)
- [SOLID Principles](#solid-principles)
- [Layered Architecture](#layered-architecture)

#### Dockerization

This project utilizes Docker for containerization, including the Dockerization of apps, network, volume, and compose.

#### Data Modeling

Data modeling is achieved using MySQL in conjunction with Sequelize. This involves the creation and association of tables using Sequelize models.

#### API RESTful Development

The project involves the construction of a RESTful API with endpoints to consume the models created during data modeling.

#### CRUD with TypeScript

A CRUD (Create, Read, Update, Delete) functionality is implemented using TypeScript, with the support of an Object-Relational Mapping (ORM) for efficient data manipulation.

#### SOLID Principles

The project follows the SOLID principles (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) to promote maintainability, scalability, and readability in the codebase.

#### Layered Architecture

The project adopts a layered architecture, organizing code into distinct layers (e.g., presentation, business logic, data access) to enhance modularity, flexibility, and maintainability (Controller, Service and Model).


This project is dockerized and uses data modeling through Sequelize. The API is consumed by a pre-provided front-end.

## ⚠ Warning

- The frontend of this project was developed and provide by Trybe(https://www.betrybe.com). All rights reserved.


## 🚀 Built With

> [![Node.js][Node.js]][Node.js-url][![sequelize][sequelize]][sequelize-url][![MySQL][MySQL]][MySQL-url][![Typescript][Typescript]][Typescript-url][![Docker][Docker]][Docker-url]


## Getting Started
### ⬇️ Pre-install
Before you begin, ensure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/) (16.14.0 LTS or higher)
- [Docker](https://www.docker.com/)


### ⬇️  Installation

1. **Choose how to clone the Repository:**
   ```bash
   # Clone using HTTPS
   git clone https://github.com/dopimentel/back-end-trybe-futebol-clube.git
   
   # Clone using SSH
   git clone git@github.com:dopimentel/back-end-trybe-futebol-clube.git
   
2. **Acess the project root folder:**
   ```bash
   cd back-end-trybe-futebol-clube

### ⚡ Running the Aplication

1. **You can run the entire application with only one command! Open an integrated terminal on root directory and run this command:**

    ```bash
    npm run compose:up
    ``` 
    

Wait a while (to make sure the container has finished loading) then you can access the application in your browser at [`localhost:3000`](http://localhost:3000) to use the client application


2. **Use this user to log in as an administrator:**
    
    ```bash
    email: admin@admin.com
    password: secret_admin
    ``` 


3. **When you finish, you can remove these containers with:**

### 🧪 Testing the Aplication

Make sure you are in /backend folder
```bash
npm run test
```

## 💬 Contact Me

<div align="left" style="display: inline_block">
  
  <a href="https://www.linkedin.com/in/marcoscoutinho" target="_blank"><img height="28rem" src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"></a> 
  <a href = "mailto:mpc_marcos@hotmail.com"><img height="28rem" src="https://img.shields.io/badge/outlook-0078D4?style=for-the-badge&logo=microsoftoutlook&logoColor=white" target="_blank"></a>
</div>

<!-- ## 📄 Licença

Esse projeto está sob licença. Veja o arquivo [LICENÇA](LICENSE.md) para mais detalhes.

[⬆ Voltar ao topo](#nome-do-projeto)<br> -->

[Javascript]: https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=white
[Javascript-url]: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[MUI]: https://img.shields.io/badge/material_ui-007FFF?style=for-the-badge&logo=mui&logoColor=white
[MUI-url]: https://img.shields.io/badge/material_ui-007FFF?style=for-the-badge&logo=mui&logoColor=white
[Node.js]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white
[Node.js-url]: https://nodejs.org/
[Docker]: https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
[MySQL]: https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white
[MySQL-url]: https://dev.mysql.com/doc/
[sequelize]: https://img.shields.io/badge/sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white
[sequelize-url]: https://sequelize.org/
[Typescript]: https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/

