import { Inject, Injectable } from '@nestjs/common';
import { DriverManager } from './driver-manager';

import { STORAGE_OPTIONS } from './constants';
import { IOptions, IStorageDriver } from './interfaces';

@Injectable()
export class StorageService {
  private static options: IOptions;
  private static driverManager: DriverManager;

  constructor(@Inject(STORAGE_OPTIONS) options: IOptions) {
    StorageService.options = options;
    StorageService.driverManager = new DriverManager();
  }

  static setDisk(disk: string): IStorageDriver {
    const driver = StorageService.driverManager.getDriver(
      disk,
      StorageService.options,
    );
    return driver;
  }
}
