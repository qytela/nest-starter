import { Inject, Injectable } from '@nestjs/common';
import { TELEGRAM_BOT } from './constants';
import TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramService {
  constructor(@Inject(TELEGRAM_BOT) private bot: TelegramBot) {}

  async sendMessage(message: string) {
    return await this.bot.sendMessage(process.env.TELEGRAM_MYCHAT_ID, message);
  }
}
