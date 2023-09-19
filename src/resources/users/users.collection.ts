import { UsersResource } from './users.resource';
import { Users } from 'src/models/users.model';

export class UsersCollection {
  constructor(data: Users[]) {
    return data.map((v) => new UsersResource(v));
  }
}
