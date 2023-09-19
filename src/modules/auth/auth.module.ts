import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/modules/users/users.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategy/jwt.strategy';

import { AUTH_JWT_SECRET, AUTH_JWT_EXPIRES_IN } from './constants';

@Module({
  providers: [AuthService, JwtStrategy],
  imports: [
    JwtModule.register({
      secret: AUTH_JWT_SECRET,
      signOptions: { expiresIn: AUTH_JWT_EXPIRES_IN },
    }),
    PassportModule,
    UsersModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}
