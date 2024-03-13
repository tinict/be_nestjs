import { ApiProperty } from '@nestjs/swagger';
export class UserUpdateModel {
  @ApiProperty({ name: 'username', required: true })
  username: string;

  @ApiProperty({ name: 'address', required: false })
  address: string;

  @ApiProperty({ name: 'chapter_id', required: false })
  chapter_id: string;

  @ApiProperty({ name: 'description' })
  description: string;

  @ApiProperty({ name: 'display_order' })
  display_order: number;

  @ApiProperty({ name: 'thumbnail' })
  thumbnail: string;

  @ApiProperty({ name: 'skills' })
  skills: string[];

  @ApiProperty({ name: 'city_id', required: false })
  city_id: string;

  @ApiProperty({ name: 'country_id', required: false })
  country_id: string;

  @ApiProperty({ name: 'language', required: false })
  language: string;

  @ApiProperty({ name: 'timezone', required: false })
  timezone: string;

  @ApiProperty({ name: 'birthday', required: false })
  birthday: Date;

  @ApiProperty({ name: 'gender', required: false })
  gender: number;

  @ApiProperty({ name: 'super_admin', required: false })
  super_admin: number;

  @ApiProperty({ name: 'is_public_phone', required: false })
  is_public_phone: number;
}
