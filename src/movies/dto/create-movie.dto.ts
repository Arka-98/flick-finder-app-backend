import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @MaxLength(10)
  @ApiProperty()
  title: string;

  @IsNumber()
  @ApiProperty()
  year: number;

  @IsString()
  @ApiProperty()
  director: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  @ApiProperty()
  cast: string[];
}
