import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { RolesEnum } from 'src/common/enums/roles.enum';

export class UpdateUserDto {
  @IsString()
  @MinLength(3)
  @ApiProperty()
  name: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsMobilePhone('en-IN')
  @IsOptional()
  @ApiPropertyOptional()
  phone?: string;

  @IsDateString()
  @ApiProperty()
  dob: string;

  @IsEnum(RolesEnum)
  @IsOptional()
  @ApiPropertyOptional({ default: RolesEnum.CUSTOMER, enum: RolesEnum })
  role: RolesEnum;
}
