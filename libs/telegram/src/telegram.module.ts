import { Module, DynamicModule } from '@nestjs/common';
import { TelegramService } from './telegram.service';

import { TELEGRAM_OPTIONS } from './constants';
import type { IOptions } from './interfaces';

@Module({
  providers: [],
  exports: [],
})
export class TelegramModule {
  static forRoot(options: IOptions): DynamicModule {
    return {
      global: true,
      module: TelegramModule,
      providers: [
        {
          provide: TELEGRAM_OPTIONS,
          useValue: options,
        },
        TelegramService,
      ],
      exports: [TelegramService],
    };
  }
}
