import { IPutOptions } from './file-options.interface';
import { IFile } from 'src/decorators/fastify-file.decorator';

export interface IStorageDriver {
  /**
   * Retrieves the content of a file from the specified path and returns it as a Buffer.
   * @param path - The path of the file to retrieve.
   */
  get(path: string): Promise<Buffer>;

  /**
   * Generates a public URL for the file located at the specified path.
   * @param path - The file path to generate the URL for.
   */
  url(path: string): Promise<string>;

  /**
   * Uploads a file to the system with optional options and returns the file URL.
   * @param file - The file object to be uploaded.
   * @param options - Additional options for the file upload (optional).
   */
  put(file: IFile, options?: IPutOptions): Promise<string>;

  /**
   * Checks if a file exists at the specified path.
   * @param path - The path of the file to check for existence.
   */
  exists(path: string): Promise<boolean>;

  /**
   * Deletes the file at the specified path and returns true if successful.
   * @param path - The path of the file to delete.
   */
  remove(path: string): Promise<boolean>;
}
