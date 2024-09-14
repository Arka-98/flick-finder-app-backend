import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsMobilePhone,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class RegisterUserDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsMobilePhone('en-IN')
  @ApiProperty()
  phone: string;

  @IsDateString()
  @ApiProperty()
  dob: string;

  @IsStrongPassword({
    minLength: 6,
    minNumbers: 1,
    minUppercase: 1,
    minSymbols: 1,
  })
  @ApiProperty()
  password: string;
}
