import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Users } from 'src/models/users.model';
import { Roles } from 'src/models/roles.model';
import { Permissions } from 'src/models/permissions.model';

import { config } from 'src/helpers';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(@InjectModel(Users) private usersModel: typeof Users) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config('jwt.AUTH_JWT_SECRET'),
    });
  }

  async validate(payload: Users) {
    const user = await this.usersModel.findByPk(payload.id, {
      include: [
        {
          model: Roles,
          include: [Permissions],
        },
      ],
    });
    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
