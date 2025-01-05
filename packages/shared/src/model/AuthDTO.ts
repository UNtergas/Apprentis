import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export interface SignInResponseInterface {
  token: string;
  email: string;
  id: number;
}

export class SignInDTO {

  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

