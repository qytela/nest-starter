import { Inject, Injectable } from '@nestjs/common';
import TelegramBot from 'node-telegram-bot-api';

import { TELEGRAM_BOT } from './constants';

@Injectable()
export class TelegramService {
  constructor(@Inject(TELEGRAM_BOT) private bot: TelegramBot) {}

  async sendMessage(message: string) {
    return await this.bot.sendMessage(process.env.TELEGRAM_MYCHAT_ID, message);
  }
}
