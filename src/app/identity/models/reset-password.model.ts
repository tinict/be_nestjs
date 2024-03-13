import { ApiProperty } from '@nestjs/swagger';

export class ResetPasswordModel {
  @ApiProperty({ name: 'verify_code', required: true })
  verify_code: string;

  @ApiProperty({ name: 'new_password', required: true })
  new_password: string;
}
