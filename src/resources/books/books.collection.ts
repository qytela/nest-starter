import { BooksResource } from './books.resource';
import { Books } from 'src/models/books.model';

export class BooksCollection {
  constructor(data: Books[]) {
    const collections = data.map((v) => new BooksResource(v));

    return {
      foo: 'This is extra json from collections',
      bar: 'You can add extra json or remove it',
      fooBar: 'Like no data inside data, see api/users example result',
      data: collections,
    };
  }
}
