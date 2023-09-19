import { Users } from 'src/models/users.model';

export class UsersResource {
  constructor(data: Users) {
    return {
      fullname: data.fullname,
      username: data.username,
      email: data.email,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    };
  }
}
