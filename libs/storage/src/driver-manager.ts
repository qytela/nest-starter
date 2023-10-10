import { InternalServerErrorException } from '@nestjs/common';
import { Public } from './drivers/public.driver';

import { IStorageDriver } from './interfaces';

export class DriverManager {
  private drivers: { [key: string]: any } = {
    public: Public,
  };

  getDriver(disk: string, config: Record<string, any>): IStorageDriver {
    try {
      return new this.drivers[disk](config);
    } catch (error) {
      throw new InternalServerErrorException(
        `Could not find a disk with the name: ${disk}`,
      );
    }
  }
}
