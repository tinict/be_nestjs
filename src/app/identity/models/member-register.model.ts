import { ApiProperty } from '@nestjs/swagger';

export class MemberRegisterModel {
  @ApiProperty({ name: 'username' })
  username: string;

  @ApiProperty({ name: 'phone' })
  phone: string;

  @ApiProperty({ name: 'email' })
  email: string;

  @ApiProperty({ name: 'password' })
  password: string;

  @ApiProperty({ name: 'first_name' })
  first_name: string;

  @ApiProperty({ name: 'middle_name' })
  middle_name: string;

  @ApiProperty({ name: 'last_name' })
  last_name: string;

  @ApiProperty({ name: 'key' })
  key: string;

  @ApiProperty({ name: 'organization_id' })
  organization_id: string;
}
