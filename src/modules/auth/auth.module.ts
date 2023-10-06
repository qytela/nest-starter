import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategy/jwt.strategy';
import { Users } from 'src/models/users.model';
import { Roles } from 'src/models/roles.model';
import { Permissions } from 'src/models/permissions.model';
import { UserHasRoles } from 'src/models/user-has-roles.model';
import { RoleHasPermissions } from 'src/models/role-has-permissions';

import { config } from 'src/helpers';

@Module({
  providers: [AuthService, JwtStrategy],
  imports: [
    JwtModule.register({
      secret: config('jwt.AUTH_JWT_SECRET'),
      signOptions: { expiresIn: config('jwt.AUTH_JWT_EXPIRES_IN') },
    }),
    SequelizeModule.forFeature([
      Users,
      Roles,
      Permissions,
      UserHasRoles,
      RoleHasPermissions,
    ]),
    PassportModule,
    UsersModule,
  ],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
