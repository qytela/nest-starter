import { IDiskOptions } from './';

export interface IOptions {
  default: string;
  disks: Record<string, IDiskOptions>;
}
