import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

import { join } from 'path';
import { config } from 'src/helpers';

const PORT = config('app.APP_PORT');

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(config('app.APP_PREFIX'));

  app.useStaticAssets({
    root: join(__dirname, '..', 'storage', 'public'),
    prefix: '/public',
  });

  await app.listen(PORT);
  console.log('\n\x1b[92mApplication running on port: %i\x1b[0m', PORT);
}

bootstrap();
