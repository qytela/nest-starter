import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { BooksModule } from './modules/books/books.module';

import { config } from 'src/helpers';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: config('database.DATABASE_DIALECT'),
      host: config('database.DATABASE_HOST'),
      port: config('database.DATABASE_PORT'),
      username: config('database.DATABASE_USER'),
      password: config('database.DATABASE_PASS'),
      database: config('database.DATABASE_NAME'),
      logging: config('database.DATABASE_QUERY_LOG'),
      autoLoadModels: config('database.OPTIONS.AUTO_LOAD_MODELS'),
      synchronize: config('database.OPTIONS.SYNCHRONIZE'),
    }),
    AuthModule,
    UsersModule,
    BooksModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
