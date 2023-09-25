import {
  Controller,
  Get,
  Post,
  Req,
  Body,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from 'src/modules/auth/auth.service';
import { JwtAuthGuard } from 'src/modules/auth/strategy/jwt-auth.guard';
import { RolesGuard } from 'src/modules/auth/strategy/roles-auth.guard';
import { Role } from 'src/decorators/role.decorator';
import { EmailExistsPipe } from 'src/pipes/email-exists.pipe';
import { ApiResource } from 'src/resources/api.resource';
import { UsersResource } from 'src/resources/users/users.resource';
import { UsersCollection } from 'src/resources/users/users.collection';
import { LoginUserDTO } from 'src/dto/users/login-user.dto';
import { CreateUserDTO } from 'src/dto/users/create-user.dto';

@Controller('api/users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('auth/login')
  login(@Body() body: LoginUserDTO) {
    return this.authService.login(body);
  }

  @UsePipes(EmailExistsPipe)
  @Post('auth/register')
  async register(@Body() body: CreateUserDTO) {
    const user = await this.usersService.register(body);
    return new ApiResource(new UsersResource(user));
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  profile(@Req() req) {
    return new ApiResource(new UsersResource(req.user));
  }

  /**
   * You can use RolesGuard and Role decorator like this
   *
   * @UseGuards(JwtAuthGuard, RolesGuard)
   * @Role(['admin'])
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Role(['admin'])
  @Get()
  async findAll() {
    const users = await this.usersService.findAll();
    return new ApiResource(new UsersCollection(users));
  }
}
