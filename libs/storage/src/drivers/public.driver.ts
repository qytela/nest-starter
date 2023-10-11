import {
  ConflictException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as fs from 'fs-extra';
import { randomUUID } from 'crypto';
import { join, extname } from 'path';
import { config } from 'src/helpers';

import { IStorageDriver, IPutOptions } from '../interfaces';
import { IFile } from '../interfaces';

export class PublicDriver implements IStorageDriver {
  private appUrl = config('app.APP_URL');
  private publicPath = join(__dirname, '..', 'storage', 'public');
  private publicUrl = join(this.appUrl, 'public');

  /**
   * Retrieves the content of a file from the specified path and returns it as a Buffer.
   * @param path - The path of the file to retrieve.
   */
  async get(path: string): Promise<Buffer | null> {
    try {
      const fileExists = await this.exists(path);
      if (fileExists) {
        const file = await fs.readFile(this.publicPath + path);
        return file;
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
      const fileExists = await this.exists(path);
      if (!fileExists) {
        throw new UnprocessableEntityException('File not found');
      }

      return join(this.publicUrl, path);
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

      const fileName = join(path, `${name}${ext}`);
      const filePath = join(this.publicPath, fileName);

      const fileExists = await fs.exists(filePath);
      if (fileExists && !options.replacing) {
        throw new ConflictException('File already exists');
      }

      await fs.outputFile(filePath, file.buffer);

      return join(this.publicUrl, fileName);
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
      const fileExists = await fs.exists(join(this.publicPath, path));
      return fileExists;
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }

  /**
   * Deletes the file at the specified path and returns true if successful.
   * @param path - The path of the file to delete.
   */
  async remove(path: string): Promise<boolean> {
    try {
      const fileExists = await this.exists(path);
      if (!fileExists) return false;

      await fs.remove(join(this.publicPath, path));

      return true;
    } catch (error) {
      throw new UnprocessableEntityException(error);
    }
  }
}
