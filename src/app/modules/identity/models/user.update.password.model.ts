import { ApiProperty } from '@nestjs/swagger';

export class UserUpdatePasswordModel {
  @ApiProperty({ name: 'password', required: true })
  password: string;
}
