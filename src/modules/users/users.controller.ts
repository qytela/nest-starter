import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from 'src/modules/auth/strategy/jwt-auth.guard';
import { UserAccess } from 'src/decorators/user-access.decorator';
import { ApiResource } from 'src/resources/api.resource';
import { UsersResource } from 'src/resources/users/users.resource';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  profile(@UserAccess() user) {
    return new ApiResource(new UsersResource(user));
  }
}
