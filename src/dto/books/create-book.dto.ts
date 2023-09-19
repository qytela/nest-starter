import { IsNotEmpty } from 'class-validator';

export class CreateBookDTO {
  @IsNotEmpty()
  author: string;

  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
