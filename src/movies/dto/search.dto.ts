import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class SearchDto {
  @IsString()
  @MaxLength(5)
  @ApiProperty()
  title: string;
}
