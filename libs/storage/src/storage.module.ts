import { Module, DynamicModule } from '@nestjs/common';
import { StorageService } from './storage.service';

import { STORAGE_OPTIONS } from './constants';
import type { IOptions } from './interfaces';

@Module({
  providers: [],
  exports: [],
})
export class StorageModule {
  static forRoot(options: IOptions): DynamicModule {
    return {
      global: true,
      module: StorageModule,
      providers: [
        {
          provide: STORAGE_OPTIONS,
          useValue: options,
        },
        StorageService,
      ],
    };
  }
}
