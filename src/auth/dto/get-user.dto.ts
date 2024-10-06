import { ApiProperty } from '@nestjs/swagger';

export class GetUserDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ minLength: 3 })
  name: string;

  @ApiProperty({ format: 'email' })
  email: string;

  @ApiProperty({ format: 'phone' })
  phone: string;

  @ApiProperty()
  dob: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
