import { Module, DynamicModule } from '@nestjs/common';
import { MailerService } from './mailer.service';

import { MAILER_OPTIONS } from './constants';
import type { IOptions } from './interfaces';

@Module({
  providers: [MailerService],
  exports: [MailerService],
})
export class MailerModule {
  static forRoot(options: IOptions): DynamicModule {
    return {
      global: true,
      module: MailerModule,
      providers: [
        {
          provide: MAILER_OPTIONS,
          useValue: options,
        },
        MailerService,
      ],
      exports: [MailerService],
    };
  }
}
