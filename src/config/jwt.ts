import 'dotenv/config';

class JwtConfig {
  public AUTH_JWT_SECRET: string;
  public AUTH_JWT_EXPIRES_IN: number;

  constructor() {
    this.AUTH_JWT_SECRET = process.env.APP_KEY;
    this.AUTH_JWT_EXPIRES_IN = parseInt(process.env.AUTH_JWT_EXPIRES_IN);
  }
}

export default new JwtConfig();
