import { ApiProperty } from '@nestjs/swagger';
export class UserVerifyModel {
  @ApiProperty({ name: 'user_id', required: true })
  user_id: string;

  @ApiProperty({ name: 'verified_flag', required: true })
  verified_flag: number;
}
