import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Users } from 'src/models/users.model';

@Injectable()
export class EmailExistsPipe implements PipeTransform {
  constructor(@InjectModel(Users) private usersModel: typeof Users) {}

  async transform(value: any) {
    const user = await this.usersModel.findOne({
      where: { email: value.email },
    });
    if (user) {
      throw new BadRequestException('Email already exists');
    }

    return value;
  }
}
