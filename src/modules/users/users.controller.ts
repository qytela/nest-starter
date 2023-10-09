import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/modules/auth/strategy/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/strategy/roles-auth.guard';
import { UserAccess } from 'src/decorators/user-access.decorator';
import { Role } from 'src/decorators/role.decorator';
import { RolesEnum } from 'src/models/roles.model';
import { ApiResource } from 'src/resources/api.resource';
import { UsersResource } from 'src/resources/users/users.resource';
import { UsersCollection } from 'src/resources/users/users.collection';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  profile(@UserAccess() user) {
    return new ApiResource(new UsersResource(user));
  }

  @Get('roles-permissions')
  findRolesPermissions(
    @UserAccess() user,
    @UserAccess('roles') roles,
    @UserAccess('permissions') permissions,
  ) {
    return new ApiResource({
      user: new UsersResource(user),
      roles,
      permissions,
    });
  }

  @UseGuards(RolesGuard)
  @Role([RolesEnum.ADMIN])
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return new ApiResource(new UsersCollection(users));
  }
}
