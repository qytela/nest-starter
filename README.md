<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository with database [Sequelize ORM](https://sequelize.org/) and commander.

## Installation

```bash
$ git clone https://github.com/qytela/example.git
$ cd example
$ yarn install
```

## Setting up .env

```bash
$ cp .env.example .env
```

## Migrations and Seeders

```bash
$ npx sequelize-cli db:migrate
$ npx sequelize-cli db:seed:all
```

> This command required sequelize-cli with npx, see more: https://sequelize.org/docs/v6/other-topics/migrations/

## Running the app

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Test

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

## Commander

```bash
$ node cmd help
Usage: cmd [options] [command]

Options:
  -h, --help                        display help for command

Commands:
  generate:model|gmo [options]      Generate new model
  generate:migration|gmi [options]  Generate new migration
  generate:resource|gr [options]    Generate new resource and collection
  help [command]                    display help for command
```

## License

Nest is [MIT licensed](LICENSE).
