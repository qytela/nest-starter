import { BooksResource } from './books.resource';
import { Books } from 'src/models/books.model';

export class BooksCollection {
  constructor(data: Books[]) {
    return data.map((v) => new BooksResource(v));
  }
}
