import { Inject, Injectable } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';

import { TELEGRAM_BOT } from './constants';
import { config } from 'src/helpers';

@Injectable()
export class TelegramService {
  constructor(@Inject(TELEGRAM_BOT) private bot: TelegramBot) {}

  async sendMessage(message: string) {
    return await this.bot.sendMessage(
      config('telegram.TELEGRAM_MYCHAT_ID'),
      message,
    );
  }
}
