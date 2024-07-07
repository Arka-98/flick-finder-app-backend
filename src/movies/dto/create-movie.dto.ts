import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsArray, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @ApiProperty()
  title: string;

  @IsNumber()
  @ApiProperty()
  year: number;

  @IsString()
  @ApiProperty()
  director: string;

  @IsArray()
  @IsString({ each: true })
  @ArrayMinSize(1)
  @ApiProperty()
  cast: string[];
}
