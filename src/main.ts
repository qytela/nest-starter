import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as Sentry from '@sentry/node';
import { SentryFilter } from './exceptions/sentry.filter';
import { AppModule } from './app.module';

import { config } from 'src/helpers';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // Sentry
  Sentry.init({
    environment: config('sentry.SENTRY_ENV'),
    dsn: config('sentry.SENTRY_DSN'),
  });

  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new SentryFilter(httpAdapter));
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(config('app.APP_PREFIX'));

  await app.listen(3000);
}
bootstrap();
