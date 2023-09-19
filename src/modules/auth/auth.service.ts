import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from 'src/modules/users/users.service';
import { ApiResource } from 'src/resources/api.resource';
import { LoginUserDTO } from 'src/dto/users/login-user.dto';

import { AUTH_JWT_EXPIRES_IN } from './constants';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async login(body: LoginUserDTO) {
    const user = await this.usersService.findByUsername(body.username);
    if (!user || !bcrypt.compareSync(body.password, user.password)) {
      throw new UnauthorizedException('User not found');
    }

    const payload = { id: user.id };

    return new ApiResource({
      expires_in: AUTH_JWT_EXPIRES_IN,
      access_token: this.jwtService.sign(payload),
    });
  }
}
