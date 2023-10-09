<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

<div align="center">
  <h1>Supercharge Your Node.js Applications with Nest</h1>
  <p>A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
</div>

## Welcome to the Nest Starter Kit 🔥

[![GitHub last commit](https://img.shields.io/github/last-commit/qytela/nest-example.svg)](https://github.com/qytela/nest-example/commits/1.x)
![Production Ready](https://img.shields.io/badge/production-ready-brightgreen.svg)
![Production Ready](https://img.shields.io/badge/maintained-yes-brightgreen.svg)
![GitHub repo size](https://img.shields.io/github/repo-size/qytela/nest-example.svg)

This is the Nest 10 Starter or Boilerplate to avoid the same things over and over again. 🚀

## Table of Contents 📕

- [Requirements and Features](#requirements-and-features)
- [Documentation](#documentation)
- [Getting Started](#getting-started-is-a-breeze)
  - [Installation](#installation)
  - [Setting up .env](#setting-up-env)
  - [Generate App Key](#generate-app-key)
  - [Migrations and Seeders](#migrations-and-seeders)
  - [Running the app](#running-the-app)
- [Commander](#commander)
- [Cooming Soon](#cooming-soon)

## **Requirements and Features**

Requirements:

- **Node.js v16.x or higher:** As of NestJS 10, we no longer support Node.js v12, as v12 went EOL on April 30, 2022. This means that NestJS 10 requires Node.js v16 or higher ([migration guide](https://docs.nestjs.com/migration-guide#dropping-support-for-nodejs-v12)).

Features:

- **Passport Authentication:** 🔐 Secure your app with Passport authentication.
- **Sequelize ORM:** 🎲 Interact with databases seamlessly using Sequelize ORM.
- **[Sentry & Telegram Integration](https://github.com/qytela/nest-starter/blob/1.x/SENTRY.md):** 🚨 Keep an eye on your app's health with Sentry and stay notified via Telegram.
- **Custom Decorators:** 🖋 Simplify your code with the Custom Decorators.
- **Fastify Adapter:** ⚡ Optimize performance with Fastify Adapter (switch to Express anytime).
- **Commander:** ⚙️ Harness the power of Commander for efficient command-line operations.

## **Documentation**

See more documentation [here](https://github.com/qytela/nest-starter/blob/1.x/DOCS.md). 📁

## **Getting Started is a Breeze!**

### **Installation:**

```bash
$ git clone https://github.com/qytela/nest-starter.git
$ cd nest-starter
$ yarn install
```

### **Setting up .env**

```bash
$ cp .env.example .env
```

### **Generate App Key**

```bash
$ node cmd generate:key --length <number>
```

> This is required as an authentication secret, default length: 16

### **Migrations and Seeders**

```bash
$ npx sequelize-cli db:migrate
$ npx sequelize-cli db:seed:all
```

> This command requires sequelize-cli with npx, see more [here](https://sequelize.org/docs/v6/other-topics/migrations).

### **Running the app**

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## **Commander**

Make life easier with commander ⚙️

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

## **Cooming Soon**

Here's a sneak peek at what's coming in the next releases 🔜:

- [x] **Permissions**
- [ ] **Storage: AWS S3, Local**
- [ ] **Mailer**
- [ ] **Social Login**
- [ ] **Dockerize App**
- [ ] **And Many More...**

Feel free to open an issue, share your thoughts, or suggest new features. Your input helps this project become better. 🌟

## **License**

Nest is [MIT licensed](LICENSE).
