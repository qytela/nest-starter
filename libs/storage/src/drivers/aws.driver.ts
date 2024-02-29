import {
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  S3Client,
  S3ClientConfig,
  GetObjectCommand,
  PutObjectCommand,
  HeadObjectCommand,
  DeleteObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Readable } from 'stream';
import { randomUUID } from 'crypto';
import { extname } from 'path';

import type {
  IDiskOptions,
  IFile,
  IPutOptions,
  IStorageDriver,
} from '../interfaces';

export class AWSDriver implements IStorageDriver {
  private client: S3Client;
  private config: IDiskOptions;

  constructor(config: IDiskOptions) {
    this.config = config;

    const options: S3ClientConfig = {
      endpoint: this.config.endpoint,
      forcePathStyle: this.config.forcePathStyle || false,
      region: this.config.region,
      credentials: {
        accessKeyId: this.config.accessKeyId,
        secretAccessKey: this.config.secretAccessKey,
      },
    };

    this.client = new S3Client(options);
  }

  /**
   * Retrieves the content of a file from the specified path and returns it as a Buffer.
   * @param path - The path of the file to retrieve.
   */
  async get(path: string): Promise<Buffer | null> {
    try {
      const fileExists = await this.exists(path);
      if (fileExists) {
        const command = new GetObjectCommand({
          Bucket: this.config.bucket,
          Key: path,
        });
        const response = await this.client.send(command);
        const stream = response.Body as Readable;

        return new Promise((resolve, reject) => {
          const chunks: Buffer[] = [];
          stream.on('data', (chunk) => chunks.push(chunk));
          stream.once('end', () => resolve(Buffer.concat(chunks)));
          stream.once('error', () => reject);
        });
      }

      return null;
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  /**
   * Generates a public URL for the file located at the specified path.
   * @param path - The file path to generate the URL for.
   */
  async url(path: string): Promise<string> {
    try {
      return this.signedUrl(path);
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  /**
   * Generates a signed URL for the file located at the specified path.
   * A signed URL provides limited-time access to the file.
   * @param path - The file path to generate the signed URL for.
   * @param expiresIn - The duration in seconds for which the signed URL will be valid (default 15 minutes).
   */
  async signedUrl(path: string, expiresIn: number = 3600): Promise<string> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.config.bucket,
        Key: path,
      });
      const url = await getSignedUrl(this.client, command, { expiresIn });

      return url;
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  /**
   * Uploads a file to the system with optional options and returns the file URL.
   * @param file - The file object to be uploaded.
   * @param options - Additional options for the file upload (optional).
   */
  async put(file: IFile, options?: IPutOptions): Promise<string> {
    try {
      const ext = extname(file.filename);
      const path = options?.filePath || '';
      let name: string = randomUUID();
      if (options?.fileName) {
        name = options.fileName;
      }

      const fileName = `${name}${ext}`;
      const filePath = `${path}/${fileName}`;
      const fileExists = await this.exists(filePath);

      if (fileExists && !options.replacing) {
        throw new ConflictException('File already exists');
      }

      const command = new PutObjectCommand({
        Bucket: this.config.bucket,
        Body: file.buffer,
        Key: filePath,
      });
      await this.client.send(command);

      return this.signedUrl(filePath);
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  /**
   * Checks if a file exists at the specified path.
   * @param path - The path of the file to check for existence.
   */
  async exists(path: string): Promise<boolean> {
    try {
      const command = new HeadObjectCommand({
        Bucket: this.config.bucket,
        Key: path,
      });
      await this.client.send(command);

      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Deletes the file at the specified path and returns true if successful.
   * @param path - The path of the file to delete.
   */
  async remove(path: string): Promise<boolean> {
    try {
      const command = new DeleteObjectCommand({
        Bucket: this.config.bucket,
        Key: path,
      });
      await this.client.send(command);

      return true;
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }
}
