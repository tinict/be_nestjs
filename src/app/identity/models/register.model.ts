import { ApiProperty } from '@nestjs/swagger';

export class RegisterModel {
  @ApiProperty({ name: 'username' })
  username: string;

  @ApiProperty({ name: 'phone' })
  phone: string;

  @ApiProperty({ name: 'email' })
  email: string;

  @ApiProperty({ name: 'password' })
  password: string;
}
