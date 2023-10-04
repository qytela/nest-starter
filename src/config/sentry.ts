require('dotenv').config();

class SentryConfig {
  public SENTRY_ENV: string;
  public SENTRY_DSN: string;
  public SENTRY_WEBHOOKS: boolean;
  public SENTRY_EXCEPTION_CODE: string;

  constructor() {
    this.SENTRY_ENV = process.env.SENTRY_ENV;
    this.SENTRY_DSN = process.env.SENTRY_DSN;
    this.SENTRY_WEBHOOKS = process.env.SENTRY_WEBHOOKS === 'true';
    this.SENTRY_EXCEPTION_CODE = process.env.SENTRY_EXCEPTION_CODE;
  }
}

export default new SentryConfig();
