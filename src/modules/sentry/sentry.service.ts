import { Injectable } from '@nestjs/common';
import { TelegramService } from 'src/dynamic-modules/telegram/telegram.service';

import { toBoolean } from 'utils/helpers';

@Injectable()
export class SentryService {
  constructor(private telegramService: TelegramService) {}

  async getWebHooks(body) {
    const getLevel = body?.level?.toUpperCase();
    const getUrl = body?.url;
    const getMessage = body?.event?.exception?.values[0]?.value;
    const timestamp = new Date().toISOString();
    const onlyLevels = ['ERROR'];

    if (
      onlyLevels.includes(getLevel) &&
      toBoolean(process.env.SENTRY_WEBHOOKS)
    ) {
      const message =
        `New Event Issue\n\n` +
        `\u{26D4} Level: ${getLevel}\n` +
        `\u{1F4C3} Message: ${getMessage}\n` +
        `\u{1F550} Timestamp: ${timestamp}\n` +
        `\u{1F4E2} Issue URL: ${getUrl}`;

      return this.telegramService.sendMessage(message);
    }

    return true;
  }
}
