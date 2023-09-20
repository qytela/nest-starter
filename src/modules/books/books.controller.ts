import { Controller, Get, Post, Req, Body, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { JwtAuthGuard } from 'src/modules/auth/strategy/jwt-auth.guard';
import { Entity } from 'src/decorators/entity.decorator';
import { ApiResource } from 'src/resources/api.resource';
import { BooksResource } from 'src/resources/books/books.resource';
import { CreateBookDTO } from 'src/dto/books/create-book.dto';
import { Books } from 'src/models/books.model';

@UseGuards(JwtAuthGuard)
@Controller('api/books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get(':id')
  findOne(@Entity(Books) book: Books) {
    return new ApiResource(new BooksResource(book));
  }

  @Post()
  async create(@Body() body: CreateBookDTO, @Req() req) {
    const book = await this.booksService.create(body, req.user);
    return new ApiResource(new BooksResource(book));
  }
}
