import { Users } from 'src/models/users.model';
import { RolesCollection } from '../roles/roles.collection';

export class UsersResource {
  constructor(data: Users) {
    return {
      fullname: data.fullname,
      username: data.username,
      email: data.email,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      ...(data.roles && { roles: new RolesCollection(data.roles) }),
    };
  }
}
