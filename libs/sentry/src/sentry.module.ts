import { Module, DynamicModule } from '@nestjs/common';
import { TelegramService } from '@app/telegram';
import { SentryService } from './sentry.service';
import { SentryController } from './sentry.controller';

import { TELEGRAM_OPTIONS } from '@app/telegram/constants';
import { SENTRY_OPTIONS } from './constants';
import type { IOptions } from './interfaces';

@Module({
  providers: [],
  exports: [],
  controllers: [SentryController],
})
export class SentryModule {
  static forRoot(options: IOptions): DynamicModule {
    return {
      global: true,
      module: SentryModule,
      providers: [
        {
          provide: SENTRY_OPTIONS,
          useValue: options,
        },
        {
          provide: TELEGRAM_OPTIONS,
          useExisting: TelegramService,
        },
        SentryService,
      ],
    };
  }
}
