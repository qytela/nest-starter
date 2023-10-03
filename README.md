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

---

# Sentry and Telegram Bot Notification

If you want to using log exception Sentry and send notification issue with Telegram Bot, you can follow this step.

## Create Sentry Project

First you need to create Sentry Project, just go to https://sentry.io then register if you doesn't have account, finally create the Project.

If you confused with configuration step on Sentry Dashboard, follow this step:

> 1. Select NodeJS platform
> 2. Set your alert frequency (ignore to default)
> 3. Name your project and assign it a team
> 4. push "Create Project" button, if popup show "Do you use a framework?" just "Skip"
> 5. Copy the DSN

## Setting up Sentry WebHooks

After successfully create Project, you must add WebHooks url.

1. Go to Project settings
   ![Project](https://i.ibb.co/tLPH3rz/image.png)

2. Legacy Integration > WebHooks > Enable Plugin > Fill your WebHooks url > Save Changes
   ![WebHooks](https://i.ibb.co/j8Nc8Wy/image.png)

   > You can use ngrok or other to testing, Sentry not allowed localhost.

   > Default Sentry WebHooks route is 'api/sentry/webhooks', You can change the route or add custom security.

3. Create Alert Rule

- Select project and environment (Recommended is All Environments)
- The important of this step is number 1 and 2, you can customize the other settings then Create the Rule
  ![Number 2](https://i.ibb.co/BGLZkhn/image.png)

## Create Telegram Bot

You can create the Telegram Bot on Telegram app.

> 1. Find @BotFather, follow the step and finally you get the API Token.
> 2. Get your chat id, see tutorial https://www.wikihow.com/Know-Chat-ID-on-Telegram-on-Android (Scroll to Part 2)

## Setting up .env

```bash
SENTRY_ENV=development # development, production, or etc...
SENTRY_DSN= # paste Sentry DSN here
SENTRY_WEBHOOKS=true # if you enable (true) this, make sure the Telegram bot has configurated
SENTRY_EXCEPTION_CODE=500,502,503,504,400,403,413,429 # only defined http status code can send notification to Telegram

# using Telegram bot to send Sentry notification issue
TELEGRAM_BOT_TOKEN= # get from @BotFather
TELEGRAM_MYCHAT_ID= # paste your chat id here
```

## Testing Log Exception Sentry

Just add exception like UnauthorizedException, InternalServerErrorException, etc...

## License

Nest is [MIT licensed](LICENSE).
