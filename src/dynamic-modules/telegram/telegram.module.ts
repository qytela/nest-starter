import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TELEGRAM_BOT } from './constants';

@Module({
  providers: [
    {
      provide: TELEGRAM_BOT,
      useFactory: () => {
        const TelegramBot = require('node-telegram-bot-api');
        return new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, {
          polling: true,
        });
      },
    },
    TelegramService,
  ],
  exports: [TelegramService],
})
export class TelegramModule {}
