import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from 'src/models/users.model';
import { Roles } from 'src/models/roles.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users) private usersModel: typeof Users) {}

  async findAll(): Promise<Users[]> {
    return await this.usersModel.findAll({
      include: [Roles],
    });
  }
}
