import { ApiProperty } from '@nestjs/swagger';

export class ChangePasswordModel {
  @ApiProperty()
  old_password: string;

  @ApiProperty()
  new_password: string;
}
