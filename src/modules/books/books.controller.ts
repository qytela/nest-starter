import { Controller, Get, Post, Req, Body, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { JwtAuthGuard } from 'src/modules/auth/strategy/jwt-auth.guard';
import { Entity } from 'src/decorators/entity.decorator';
import { ApiResource } from 'src/resources/api.resource';
import { BooksCollection } from 'src/resources/books/books.collection';
import { BooksResource } from 'src/resources/books/books.resource';
import { CreateBookDTO } from 'src/dto/books/create-book.dto';
import { Books } from 'src/models/books.model';
import { Users } from 'src/models/users.model';

@UseGuards(JwtAuthGuard)
@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  /**
   * You can custom the param to search and
   * pass the relations like this:
   *
   * @Entity([entity, param, relations])
   */
  @Get('title/:title')
  findByTitle(@Entity([Books, 'title', [Users]]) book: Books) {
    return new ApiResource(new BooksResource(book));
  }

  @Get(':id')
  findOne(@Entity(Books) book: Books) {
    return new ApiResource(new BooksResource(book));
  }

  @Get()
  async findAll() {
    const books = await this.booksService.findAll();
    return new ApiResource(new BooksCollection(books));
  }

  @Post()
  async create(@Body() body: CreateBookDTO, @Req() req) {
    const book = await this.booksService.create(body, req.user);
    return new ApiResource(new BooksResource(book));
  }
}
