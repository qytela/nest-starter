import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class EmailExistsPipe implements PipeTransform {
  constructor(private readonly usersService: UsersService) {}

  async transform(value: any) {
    const user = await this.usersService.findByEmail(value.email);
    if (user) {
      throw new BadRequestException('Email already exists');
    }

    return value;
  }
}
