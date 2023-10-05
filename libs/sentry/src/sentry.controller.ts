import { Inject, Controller, Post, Body, Param } from '@nestjs/common';
import { SentryService } from './sentry.service';

import { SENTRY_OPTIONS } from './constants';
import { IOptions } from './interfaces';

@Controller('sentry')
export class SentryController {
  constructor(
    @Inject(SENTRY_OPTIONS) private options: IOptions,
    private sentryService: SentryService,
  ) {}

  @Post(':path')
  getWebHooks(@Body() body, @Param() param) {
    if (param.path === this.options.pathWebHook) {
      return this.sentryService.getWebHooks(body);
    }
  }
}
