import 'dotenv/config';

class SentryConfig {
  public SENTRY_ENV: string;
  public SENTRY_DSN: string;
  public SENTRY_WEBHOOK: boolean;
  public SENTRY_PATH_WEBHOOK: string;
  public SENTRY_EXCEPTION_CODE: string;

  constructor() {
    this.SENTRY_ENV = process.env.SENTRY_ENV;
    this.SENTRY_DSN = process.env.SENTRY_DSN;
    this.SENTRY_WEBHOOK = process.env.SENTRY_WEBHOOK === 'true';
    this.SENTRY_PATH_WEBHOOK = process.env.SENTRY_PATH_WEBHOOK;
    this.SENTRY_EXCEPTION_CODE = process.env.SENTRY_EXCEPTION_CODE;
  }
}

export default new SentryConfig();
