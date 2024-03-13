import { ApiProperty } from '@nestjs/swagger';
export class ResourceCustomFieldValueCreateModel {
  @ApiProperty({ name: 'name', example: 'ResourceCustomFieldValue' })
  name: string;

  @ApiProperty({ name: 'description' })
  description: string;

  @ApiProperty({ name: 'parent_id' })
  parent_id: string;

  @ApiProperty({ name: 'display_order' })
  display_order: number;

  @ApiProperty({ name: 'resource_id' })
  resource_id: string;

  @ApiProperty({ name: 'custom_field_id' })
  custom_field_id: string;

  @ApiProperty({ name: 'custom_field_value_id' })
  custom_field_value_id: string;
}
