import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from 'src/models/users.model';
import { Roles } from 'src/models/roles.model';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users) private usersModel: typeof Users) {}

  async register(body): Promise<Users> {
    return await this.usersModel.create(body);
  }

  async findById(id: string): Promise<Users> {
    return await this.usersModel.findByPk(id, {
      include: [Roles],
    });
  }

  async findByUsername(username: string): Promise<Users> {
    return await this.usersModel.findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<Users> {
    return await this.usersModel.findOne({ where: { email } });
  }

  async findAll(): Promise<Users[]> {
    return await this.usersModel.findAll({
      include: [Roles],
    });
  }
}
