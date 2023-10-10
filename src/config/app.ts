import 'dotenv/config';

class AppConfig {
  public APP_NAME: string;
  public APP_ENV: string;
  public APP_KEY: string;
  public APP_URL: string;
  public APP_PORT: string;
  public APP_PREFIX: string;

  constructor() {
    this.APP_NAME = process.env.APP_NAME;
    this.APP_ENV = process.env.APP_ENV;
    this.APP_KEY = process.env.APP_KEY;
    this.APP_URL = process.env.APP_URL;
    this.APP_PORT = process.env.APP_PORT;
    this.APP_PREFIX = process.env.APP_PREFIX;
  }
}

export default new AppConfig();
