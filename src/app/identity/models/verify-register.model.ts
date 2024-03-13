import { ApiProperty } from '@nestjs/swagger';

export class VerifyRegisterModel {
  @ApiProperty({ name: 'verify_code', required: true })
  verify_code: string;
}
