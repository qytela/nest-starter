import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/modules/auth/strategy/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/strategy/roles-auth.guard';
import { Role } from 'src/decorators/role.decorator';
import { ApiResource } from 'src/resources/api.resource';
import { UsersResource } from 'src/resources/users/users.resource';
import { UsersCollection } from 'src/resources/users/users.collection';
import { RolesEnum } from 'src/models/roles.model';

@Controller('api/users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  profile(@Req() req) {
    return new ApiResource(new UsersResource(req.user));
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role([RolesEnum.ADMIN])
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return new ApiResource(new UsersCollection(users));
  }
}
