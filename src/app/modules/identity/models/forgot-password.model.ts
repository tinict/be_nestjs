import { ApiProperty } from '@nestjs/swagger';

export class ForgotPasswordModel {
  @ApiProperty({ name: 'email', required: true })
  email: string;
}
