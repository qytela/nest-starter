import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Books } from 'src/models/books.model';
import { Users } from 'src/models/users.model';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Books) private booksModel: typeof Books) {}

  async create(body, user: Users): Promise<Books> {
    return await this.booksModel.create({
      ...body,
      userId: user.id,
    });
  }
}
