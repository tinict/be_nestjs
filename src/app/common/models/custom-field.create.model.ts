import { ApiProperty } from '@nestjs/swagger';
export class CustomFieldCreateModel {
  @ApiProperty({ name: 'name', example: 'CustomField' })
  name: string;

  @ApiProperty({ name: 'description' })
  description: string;

  @ApiProperty({ name: 'parent_id' })
  parent_id: string;

  @ApiProperty({ name: 'display_order' })
  display_order: number;

  @ApiProperty({ name: 'custom_field_type_id', required: false })
  custom_field_type_id: string;
}
