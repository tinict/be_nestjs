import { ApiProperty } from '@nestjs/swagger';

export class OrganizationCreateModel {
  @ApiProperty({ name: 'workspace_id' })
  workspace_id: string;

  @ApiProperty({ name: 'name', example: 'Organization name' })
  name: string;

  @ApiProperty({ name: 'description' })
  description: string;

  @ApiProperty({ name: 'phone' })
  phone: string;

  @ApiProperty({ name: 'chapter_id', required: false })
  chapter_id: string;

  @ApiProperty({ name: 'address', required: false })
  address: string;

  @ApiProperty({ name: 'thumbnail', required: false })
  thumbnail: string;

  @ApiProperty({ name: 'code', required: false, minLength: 10 })
  code: string;

  @ApiProperty({ name: 'company_size', required: false })
  company_size: number;

  @ApiProperty({ name: 'parent_id', required: false })
  parent_id: string;

  @ApiProperty({ name: 'display_order', required: false })
  display_order: number;

  @ApiProperty({ name: 'status', required: false })
  status: number;

  @ApiProperty({ name: 'images', required: false })
  images: string;

  @ApiProperty({ name: 'websites', required: false })
  websites: string;

  @ApiProperty({ name: 'socials', required: false })
  socials: string;

  @ApiProperty({ name: 'grade', required: false })
  grade: number;

  @ApiProperty({ name: 'rate', required: false })
  rate: number;

  @ApiProperty({ name: 'cover', required: false })
  cover: string;

  @ApiProperty({ name: 'avatar', required: false })
  avatar: string;

  @ApiProperty({ name: 'industries', required: false })
  industries: string[];

  @ApiProperty({ name: 'services', required: false })
  services: string[];

  @ApiProperty({ name: 'country_id', required: false })
  country_id: string;

  @ApiProperty({ name: 'city_id', required: false })
  city_id: string;

  @ApiProperty({ name: 'vision', required: false })
  vision: string;

  @ApiProperty({ name: 'mission', required: false })
  mission: string;

  @ApiProperty({ name: 'core_values', required: false })
  core_values: string;

  @ApiProperty({ name: 'working_time_start', required: false })
  working_time_start: Date;

  @ApiProperty({ name: 'working_time_end', required: false })
  working_time_end: Date;
}
