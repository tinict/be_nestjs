import { ApiProperty } from '@nestjs/swagger';
export class CustomFieldValueCreateModel {
  @ApiProperty({ name: 'name', example: 'CustomFieldValue' })
  name: string;

  @ApiProperty({ name: 'description' })
  description: string;

  @ApiProperty({ name: 'parent_id' })
  parent_id: string;

  @ApiProperty({ name: 'display_order' })
  display_order: number;

  @ApiProperty({ name: 'custom_field_id' })
  custom_field_id: string;
}
