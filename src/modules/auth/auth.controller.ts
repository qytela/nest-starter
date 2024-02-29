import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResource } from 'src/resources/api.resource';
import { UsersResource } from 'src/resources/users/users.resource';
import { LoginUserDTO } from 'src/dto/users/login-user.dto';
import { CreateUserDTO } from 'src/dto/users/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() body: LoginUserDTO) {
    return this.authService.login(body);
  }

  @Post('register')
  async register(@Body() body: CreateUserDTO) {
    const user = await this.authService.register(body);
    return new ApiResource(new UsersResource(user));
  }
}
