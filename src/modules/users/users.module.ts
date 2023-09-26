import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { Users } from 'src/models/users.model';

@Module({
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([Users])],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
