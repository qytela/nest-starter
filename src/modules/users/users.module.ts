import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthModule } from 'src/modules/auth/auth.module';
import { Users } from 'src/models/users.model';
import { Roles } from 'src/models/roles.model';
import { UserHasRoles } from 'src/models/user-has-roles.model';

@Module({
  providers: [UsersService],
  imports: [
    SequelizeModule.forFeature([Users, Roles, UserHasRoles]),
    forwardRef(() => AuthModule),
  ],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
