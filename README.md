# [Trybe Futebol Clube ⚽](http://167.99.175.103:3000/leaderboard)

[![Site preview](/app/frontend/public/social-media.png)](http://167.99.175.103:3000/leaderboard)

[![DigitalOcean Referral Badge](https://web-platforms.sfo2.cdn.digitaloceanspaces.com/WWW/Badge%202.svg)](https://www.digitalocean.com/?refcode=88bf4cedf02b&utm_campaign=Referral_Invite&utm_medium=Referral_Program&utm_source=badge)

>(earn 200 dollars)


## 💻 What is it about?

<p align="center">
    TFC is an website about football matches and ranking. If you are logged in, it is possible to edit and register new matches, as long as you are an admin user (authentication and authorization).
   <br>
   It is running on a DigitalOcean Droplet. Three services (backend, frontend, and MySQL database) are running in Docker containers. It was set up using Bash. Link demo:
    <a href="http://projects.pimentel.live/tfc">http://projects.pimentel.live/tfc/</a>
   <br>
  </p>
</p>

<br>


URL to the client application: [`http://projects.pimentel.live/tfc`](http://projects.pimentel.live/tfc)

Use the admin user to login
    
    email: admin@admin.com
    password: secret_admin

Endpoints GET: /teams /teams/:id /matches matches/:id /leaderboard /leaderboard/home /leaderboard/away
You also can see the server side running: [`http://projects.pimentel.live:3001`](http://projects.pimentel.live:3001)

Endpoints GET: /teams /teams/:id /matches matches/:id /leaderboard /leaderboard/home /leaderboard/away

(e.g. [`http://projects.pimentel.live:3001/matches`](http://projects.pimentel.live:3001/matches))

<br>

<p align="center">
    <a href="https://dopimentel.github.io">About Me</a>
</p>
<br>

### Built With

> [![Node.js][Node.js]][Node.js-url][![Docker][Docker]][Docker-url]![Express][Express][![sequelize][sequelize]][sequelize-url][![MySQL][MySQL]][MySQL-url][![Typescript][Typescript]][Typescript-url]![JWT][JWT]

### Table of Contents

- [Dockerization](#dockerization)
- [Data Modeling - ORM](#data-modeling)
- [API RESTful Development](#api-restful-development)
- [CRUD with TypeScript](#crud-with-typescript)
- [SOLID Principles](#solid-principles)
- [Layered Architecture](#layered-architecture)

>#### Dockerization
>
>This project utilizes Docker for containerization, including the Dockerization of apps, network, volume, and compose.
>
>#### Data Modeling
>
>Data modeling is achieved using MySQL in conjunction with Sequelize. This involves the creation and association of tables using Sequelize models.
>
>#### API RESTful Development
>
>The project involves the construction of a RESTful API with endpoints to consume the models created during data modeling.
>
>#### CRUD with TypeScript
>
>A CRUD (Create, Read, Update, Delete) functionality is implemented using TypeScript, with the support of an Object-Relational Mapping (ORM) for efficient data manipulation.
>
>#### SOLID Principles
>
>The project follows the SOLID principles (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) to promote maintainability, >scalability, and readability in the codebase.
>
>#### Layered Architecture
>
>The project adopts a layered architecture, organizing code into distinct layers (e.g., presentation, business logic, data access) to enhance modularity, flexibility, and >maintainability (Controller, Service and Model).
>
>
>This project is dockerized and uses data modeling through Sequelize. The API is consumed by a pre-provided front-end.

## ⚠ Warning

- The frontend of this project was developed and provide by Trybe(https://www.betrybe.com). All rights reserved.


## Getting Started
### ⬇️ Pre-install
Before you begin, ensure you have the following prerequisites installed:

- [Node.js](https://nodejs.org/) (16.14.0 LTS or higher): ```bash nvm use 16.14```
- [Docker](https://www.docker.com/) (2.5 or higher): ```bash docker-compose --version```


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
    

> Wait a while (to make sure the container has finished loading) then you can access the application in your browser at [`localhost:3000`](http://localhost:3000) to use the client application or [`localhost:3001`](http://localhost:3001) to see the server side through endpoints (/matches, /teams, /leaderboard) (e.g: http://localhost:3001/leaderboard/).


2. **Use this user to log in as an administrator:**
    
    ```bash
    email: admin@admin.com
    password: secret_admin
    ``` 


3. **When you finish, you can remove these containers with:**

   ```bash
   npm run compose:down
   ```

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
[DigitalOcean]: https://img.shields.io/badge/Digital_Ocean-0080FF?style=for-the-badge&logo=DigitalOcean&logoColor=white

[MySQL]: https://img.shields.io/badge/mysql-4479A1?style=for-the-badge&logo=mysql&logoColor=white
[MySQL-url]: https://dev.mysql.com/doc/
[Node.js]: https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=node.js&logoColor=white
[Node.js-url]: https://nodejs.org/
[Typescript]: https://img.shields.io/badge/typescript-3178C6?style=for-the-badge&logo=typescript&logoColor=white
[Typescript-url]: https://www.typescriptlang.org/
[Typescript-url]: https://www.typescriptlang.org/
[Docker]: https://img.shields.io/badge/docker-2496ED?style=for-the-badge&logo=docker&logoColor=white
[Docker-url]: https://www.docker.com/
[Sequelize]: https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white
[Sequelize-url]: https://github.com/dopimentel/back-end-trybe-futebol-clube
[Express]: https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white
[Express-url]: https://github.com/dopimentel/back-end-trybe-futebol-clube
[JWT]: https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white
[JWT-url]: https://github.com/dopimentel/back-end-trybe-futebol-clube
[Python]: https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54
[Railway]: https://img.shields.io/badge/Railway-131415?style=for-the-badge&logo=railway&logoColor=white
[Postman]: https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white
[TsNode]: https://img.shields.io/badge/ts--node-3178C6?style=for-the-badge&logo=ts-node&logoColor=white
[NPM]: https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white

