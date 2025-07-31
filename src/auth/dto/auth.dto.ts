/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsEmail()
  username: string;

  @IsString()
  passwork: string;
}
