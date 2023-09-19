import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Books } from 'src/models/books.model';

@Module({
  providers: [BooksService],
  imports: [SequelizeModule.forFeature([Books])],
  controllers: [BooksController],
})
export class BooksModule {}
