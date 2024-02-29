import { IsNotEmpty, IsEmail } from 'class-validator';
import { IsUnique } from 'src/validators/UniqueValidator';
import { Users } from 'src/models/users.model';

export class CreateUserDTO {
  @IsNotEmpty()
  fullname: string;

  @IsNotEmpty()
  @IsUnique([Users])
  username: string;

  @IsNotEmpty()
  password: string;

  @IsEmail()
  @IsUnique([Users])
  email: string;
}
