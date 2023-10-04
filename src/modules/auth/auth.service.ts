import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { JwtService } from '@nestjs/jwt';
import { Sequelize } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';
import { ApiResource } from 'src/resources/api.resource';
import { LoginUserDTO } from 'src/dto/users/login-user.dto';
import { Users } from 'src/models/users.model';
import { RolesEnum } from 'src/models/roles.model';

import { config } from 'src/helpers';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Users) private usersModel: typeof Users,
    private jwtService: JwtService,
    private sequelize: Sequelize,
  ) {}

  async login(body: LoginUserDTO): Promise<any> {
    const user = await this.usersModel.findOne({
      attributes: ['id', 'username', 'password'],
      where: { username: body.username },
    });
    if (!user || !bcrypt.compareSync(body.password, user.password)) {
      throw new UnauthorizedException('User not found');
    }

    const payload = { id: user.id };

    return new ApiResource({
      expires_in: config('jwt.AUTH_JWT_EXPIRES_IN'),
      access_token: this.jwtService.sign(payload),
    });
  }

  async register(body): Promise<Users> {
    try {
      return await this.sequelize.transaction(async (transaction) => {
        const user = await this.usersModel.create(body, { transaction });
        await this.usersModel.assignRole(user.id, RolesEnum.USER, transaction);

        return user;
      });
    } catch (e) {
      throw new InternalServerErrorException(e.message);
    }
  }
}
