import { ApiProperty } from '@nestjs/swagger';

export class UserUpdatePhoneModel {
  @ApiProperty({ name: 'phone', required: true })
  phone: string;
}
