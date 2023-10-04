class AppConfig {
  public APP_NAME: string;
  public APP_KEY: string;
  public APP_URL: string;
  public APP_PREFIX: string;

  constructor() {
    this.APP_NAME = process.env.APP_NAME;
    this.APP_KEY = process.env.APP_KEY;
    this.APP_URL = process.env.APP_URL;
    this.APP_PREFIX = 'api';
  }
}

export default new AppConfig();
