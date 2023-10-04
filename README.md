<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<div align="center">
  <h1>Supercharge Your Node.js Applications with Nest</h1>
  <p>A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
</div>

## Welcome to the Nest Starter Kit!

[![GitHub last commit](https://img.shields.io/github/last-commit/qytela/nest-example.svg)](https://github.com/qytela/nest-example/commits/1.x)
![Production Ready](https://img.shields.io/badge/production-ready-brightgreen.svg)
![Production Ready](https://img.shields.io/badge/maintained-yes-brightgreen.svg)
![GitHub repo size](https://img.shields.io/github/repo-size/qytela/nest-example.svg)

Welcome to the world of Nest, where your Node.js applications take flight! Our starter kit comes with all the essential features you need to build robust and secure server-side applications. Dive in and explore what Nest has to offer.

### Features at a Glance:

- **Passport Authentication:** Secure your app with Passport authentication.
- **Sequelize ORM:** Interact with databases seamlessly using Sequelize ORM.
- **[Sentry & Telegram Integration](https://github.com/qytela/nest-example/blob/main/SENTRY.md):** Keep an eye on your app's health with Sentry and stay notified via Telegram.
- **Entity Decorator:** Simplify your code with the Entity Decorator ([example](https://github.com/qytela/nest-example/blob/e8a119c27e671a720ad24768c9a76c1714922c17/src/modules/books/books.controller.ts#L24)).
- **Role Decorator:** Manage user roles effortlessly ([example](https://github.com/qytela/nest-example/blob/e8a119c27e671a720ad24768c9a76c1714922c17/src/modules/users/users.controller.ts#L22)).
- **Permission Decorator:** Coming soon!
- **Fastify Adapter:** Optimize performance with Fastify Adapter (switch to Express anytime).
- **Commander:** Harness the power of Commander for efficient command-line operations.

## Getting Started

## Installation

```bash
$ git clone https://github.com/qytela/nest-starter.git
$ cd nest-starter
$ yarn install
```

## Setting up .env

```bash
$ cp .env.example .env
```

## Generate App Key

```bash
$ node cmd generate:key --length <number>
```

> This is required as an authentication secret, default length: 16

## Migrations and Seeders

```bash
$ npx sequelize-cli db:migrate
$ npx sequelize-cli db:seed:all
```

> This command requires sequelize-cli with npx, see more: https://sequelize.org/docs/v6/other-topics/migrations

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Commander

```bash
$ node cmd help
Usage: cmd [options] [command]

Options:
  -h, --help                        display help for command

Commands:
  generate:key|gk [options]         Generate app key
  generate:model|gmo [options]      Generate new model
  generate:migration|gmi [options]  Generate new migration
  generate:resource|gr [options]    Generate new resource and collection
  help [command]                    display help for command
```

## License

Nest is [MIT licensed](LICENSE).
