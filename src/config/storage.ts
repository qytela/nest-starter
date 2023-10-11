import 'dotenv/config';

class StorageConfig {
  public STORAGE_DEFAULT: string;

  public AWS_ENDPOINT: string;
  public AWS_BUCKET: string;
  public AWS_REGION: string;
  public AWS_ACCESS_KEY: string;
  public AWS_SECRET_ACCESS_KEY: string;
  public AWS_FORCE_PATH_STYLE: boolean;

  constructor() {
    this.STORAGE_DEFAULT = process.env.STORAGE_DEFAULT;

    this.AWS_ENDPOINT = process.env.AWS_ENDPOINT;
    this.AWS_BUCKET = process.env.AWS_BUCKET;
    this.AWS_REGION = process.env.AWS_REGION;
    this.AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
    this.AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
    this.AWS_FORCE_PATH_STYLE = process.env.AWS_FORCE_PATH_STYLE === 'true';
  }
}

export default new StorageConfig();
