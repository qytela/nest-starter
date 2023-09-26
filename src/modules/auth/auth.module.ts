import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { Users } from 'src/models/users.model';
import { Roles } from 'src/models/roles.model';
import { UserHasRoles } from 'src/models/user-has-roles.model';

import { AUTH_JWT_SECRET, AUTH_JWT_EXPIRES_IN } from './constants';
import { AuthController } from './auth.controller';

@Module({
  providers: [AuthService, JwtStrategy],
  imports: [
    JwtModule.register({
      secret: AUTH_JWT_SECRET,
      signOptions: { expiresIn: AUTH_JWT_EXPIRES_IN },
    }),
    SequelizeModule.forFeature([Users, Roles, UserHasRoles]),
    PassportModule,
    UsersModule,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
