import 'dotenv/config';

import { Dialect } from 'sequelize';

interface IOptions {
  AUTO_LOAD_MODELS: boolean;
  SYNCHRONIZE: boolean;
}

class DatabaseConfig {
  public DATABASE_DIALECT: Dialect;
  public DATABASE_HOST: string;
  public DATABASE_PORT: number;
  public DATABASE_USER: string;
  public DATABASE_PASS: string;
  public DATABASE_NAME: string;

  public DATABASE_QUERY_LOG: (sql: string, timing: number) => void;

  public OPTIONS: IOptions;

  constructor() {
    this.DATABASE_DIALECT = process.env.DATABASE_DIALECT as Dialect;
    this.DATABASE_HOST = process.env.DATABASE_HOST;
    this.DATABASE_PORT = parseInt(process.env.DATABASE_PORT);
    this.DATABASE_USER = process.env.DATABASE_USER;
    this.DATABASE_PASS = process.env.DATABASE_PASS;
    this.DATABASE_NAME = process.env.DATABASE_NAME;

    this.DATABASE_QUERY_LOG = (sql: string, timing: number) => {
      if (process.env.DATABASE_QUERY_LOG === 'true') {
        console.log('\x1b[33mQuery Log - %s\x1b[0m', sql);
      }
    };

    this.OPTIONS = {
      AUTO_LOAD_MODELS: true,
      SYNCHRONIZE: true,
    };
  }
}

export default new DatabaseConfig();
