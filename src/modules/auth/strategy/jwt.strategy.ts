import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/modules/users/users.service';
import { Users } from 'src/models/users.model';

import { AUTH_JWT_SECRET } from '../constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AUTH_JWT_SECRET,
    });
  }

  async validate(payload: Users) {
    const user = await this.usersService.findById(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
