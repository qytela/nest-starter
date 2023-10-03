import { Module } from '@nestjs/common';
import { SentryController } from './sentry.controller';
import { SentryService } from './sentry.service';
import { TelegramModule } from 'src/dynamic-modules/telegram/telegram.module';

@Module({
  providers: [SentryService],
  imports: [TelegramModule],
  controllers: [SentryController],
})
export class SentryModule {}
