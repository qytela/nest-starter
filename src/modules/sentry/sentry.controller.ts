import { Controller, Post, Body } from '@nestjs/common';
import { SentryService } from './sentry.service';

@Controller('sentry')
export class SentryController {
  constructor(private sentryService: SentryService) {}

  @Post('webhooks')
  getWebHooks(@Body() body) {
    return this.sentryService.getWebHooks(body);
  }
}
