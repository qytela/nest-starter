import 'dotenv/config';

class MailerConfig {
  public MAIL_SERVICE: string;
  public MAIL_HOST: string;
  public MAIL_PORT: number;
  public MAIL_SECURE: boolean;
  public MAIL_USERNAME: string;
  public MAIL_PASSWORD: string;
  public MAIL_FROM_NAME: string;
  public MAIL_FROM_ADDRESS: string;

  constructor() {
    this.MAIL_SERVICE = process.env.MAIL_SERVICE;
    this.MAIL_HOST = process.env.MAIL_HOST;
    this.MAIL_PORT = parseInt(process.env.MAIL_PORT);
    this.MAIL_SECURE = process.env.MAIL_SECURE === 'true';
    this.MAIL_USERNAME = process.env.MAIL_USERNAME;
    this.MAIL_PASSWORD = process.env.MAIL_PASSWORD;
    this.MAIL_FROM_NAME = process.env.MAIL_FROM_NAME;
    this.MAIL_FROM_ADDRESS = process.env.MAIL_FROM_ADDRESS;
  }
}

export default new MailerConfig();
