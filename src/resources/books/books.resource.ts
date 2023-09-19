import { UsersResource } from '../users/users.resource';
import { Books } from 'src/models/books.model';

export class BooksResource {
  constructor(data: Books) {
    return {
      id: data.id,
      title: data.title,
      author: data.author,
      description: data.description,
      ...(data.user && { user: new UsersResource(data.user) }),
    };
  }
}
