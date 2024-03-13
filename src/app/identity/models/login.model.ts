import { ApiProperty } from '@nestjs/swagger';

export class LoginModel {
  @ApiProperty()
  phone: string;

  @ApiProperty()
  password: string;
}
