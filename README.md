<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Gestion de Proyectos - Backend (NestJS)

Una breve descripción de tu proyecto, su propósito y las principales funcionalidades que ofrece el backend.

---

## Tabla de Contenidos

- [Tecnologías](#1-tecnologías)
- [Instalación](#2-instalación)
- [Scripts de Ejecución](#3-scripts-de-ejecución)
- [Configuración de la Base de Datos](#4-configuración-de-la-base-de-datos)
- [Autenticación](#5-autenticación)
- [Endpoints de la API](#6-endpoints-de-la-api)
- [Contenedorización](#7-contenedorización)
- [Despliegue](#8-despliegue)
- [Contacto](#9-contacto)

---

## 1. Tecnologías

Este proyecto de backend está construido con las siguientes tecnologías:

- **Framework:** NestJS  
- **Lenguaje:** TypeScript  
- **Base de datos:** PostgreSQL  
- **ORM:** TypeORM  
- **Autenticación:** JWT (JSON Web Tokens)

---

## 2. Instalación

Sigue estos pasos para configurar el proyecto localmente.

Clona el repositorio:
```bash
git clone https://github.com/AdilsonCuevas/gestor_project_backend.git
```
Navegar al directorio:
```bash
cd [nombre-del-proyecto-backend]
```
instalar dependencias:
```bash
npm install
```

instalaciones importantes una a una:
```bash
# PostgreSQL + TypeORM
npm install @nestjs/typeorm typeorm pg

# JWT Auth
npm install @nestjs/jwt passport-jwt @nestjs/passport passport bcrypt
npm install --save-dev @types/passport-jwt @types/bcrypt
```

## 3. Scripts de Ejecución

Ejecucion

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

 Testing

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## 4. Configuración de la Base de Datos

El proyecto utiliza PostgreSQL. Asegúrate de tener una instancia en ejecución y de configurar las variables de entorno.
recuerda que las viarables de entorno son los datos de conexion a la base de datos y cables secretas de JWT

### Variables de Entorno

Crea un archivo .env en la raíz del proyecto con la siguiente estructura:
```bash
PORT=4000

DB_TYPE=*****
DB_HOST=*****
DB_PORT=5432
DB_USER=*****
DB_PASSWORD=*****
DB_NAME=*****

CORS_ORIGIN=*****  //URL DE FRONT

JWT_SECRET=*****
JWT_REFRESH=*****
```

## 5. Autenticación

El sistema de autenticación se gestiona a través de JWT. Los tokens se firman con la clave secreta definida en las variables de entorno.

- POST /auth/login: Para iniciar sesión.

- POST /auth/register: Para registrar un nuevo usuario.

  ## 6. Endpoints de la API
```bash
| Método | Endpoint            | Descripción                             |
| ------ | ------------------- | --------------------------------------- |
| POST   | /auth/register      | Crea un nuevo usuario.                  |
| POST   | /auth/login         | Autentica un usuario y devuelve un JWT. |
| GET    | /auth/profile       | Perfil del usuario autenticado .        |
| GET    | /projects           | Obtiene la lista de productos.          |
| POST   | /projects           | Crea un nuevo producto.                 |
| GET    | /projects/:id       | Obtener proyecto específico.            |
| PUT    | /projects/:id       | Actualizar UN proyecto.                 |
| DELETE | /projects/:id       | Eliminar un proyecto.                   |
| GET    | /projects/:id/tasks | Obtener lista de tareas.                |
| POST   | /projects/:id/tasks | Crear tarea a un proyectp.              |
| PUT    | /tasks/:id          | Actualizar tarea.                       |
| DELETE | /tasks/:id          | Elimiar una tarea.                      |
| GET    | /users              | Obtener lista de usuarios.              |
| POST   | /users              | Crea un nuevo usuario.                  |
| PUT    | /users/:id          | Actualizar usuario.                     |
```

## 7. Contenedorización
Se proporciona un Dockerfile para crear una imagen de Docker del proyecto.

Construye la imagen:
```bash
docker build -t nombre-del-proyecto-backend .
```
Ejecutar contenedor
```bash
docker run -p 3000:3000 -d nombre-del-proyecto-backend
```
## 8. Despliegue
El backend está desplegado en Railway. Las variables de entorno se configuran directamente en el panel de control de Railway.

## 9. Contacto
Si tienes alguna pregunta o sugerencia, no dudes en contactarme en cuevasadilson@gmail.com
