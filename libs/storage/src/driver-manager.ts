import { InternalServerErrorException } from '@nestjs/common';
import { PublicDriver } from './drivers/public.driver';
import { AWSDriver } from './drivers/aws.driver';

import { IOptions, IStorageDriver } from './interfaces';

export class DriverManager {
  private drivers: { [key: string]: any } = {
    public: PublicDriver,
    s3: AWSDriver,
  };

  getDriver(disk: string, config: IOptions): IStorageDriver {
    try {
      const driver = config.disks[disk].driver;

      return new this.drivers[driver](config.disks[disk]);
    } catch (error) {
      console.error(error);

      throw new InternalServerErrorException(
        `Could not find a disk with the name: ${disk}`,
      );
    }
  }
}
