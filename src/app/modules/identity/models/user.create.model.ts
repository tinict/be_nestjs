import { ApiProperty } from '@nestjs/swagger';

export class UserCreateModel {
  @ApiProperty({
    name: 'email',
    required: false,
  })
  email: string;

  @ApiProperty({ name: 'username', required: true })
  username: string;

  @ApiProperty({ name: 'phone', required: true })
  phone: string;

  @ApiProperty({ name: 'address', required: false })
  address: string;

  @ApiProperty({ name: 'chapter_id', required: false })
  chapter_id: string;

  @ApiProperty({ name: 'password', required: true })
  password: string;

  @ApiProperty({ name: 'description' })
  description: string;

  @ApiProperty({ name: 'display_order' })
  display_order: number;

  @ApiProperty({ name: 'super_admin' })
  super_admin: number;

  @ApiProperty({ name: 'skills' })
  skills: string[];
}
