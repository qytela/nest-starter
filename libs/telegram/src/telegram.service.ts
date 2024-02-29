import { Inject, Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';

import { TELEGRAM_OPTIONS } from './constants';
import type { IOptions } from './interfaces';

@Injectable()
export class TelegramService {
  private bot: TelegramBot;

  constructor(@Inject(TELEGRAM_OPTIONS) private options: IOptions) {
    this.bot = new TelegramBot(this.options.token, {
      polling: this.options.polling || true,
    });
  }

  async sendMessage(message: string) {
    return await this.bot.sendMessage(this.options.chatId, message);
  }
}
