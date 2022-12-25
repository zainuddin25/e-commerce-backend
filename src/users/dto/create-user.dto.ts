import { IsNotEmpty } from 'class-validator';
import { string } from 'joi';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  photo_profile: string

  role: []
}
