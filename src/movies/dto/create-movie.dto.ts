import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { SearchDto } from './search.dto';

export class CreateMovieDto extends SearchDto {
  @MaxLength(10)
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
