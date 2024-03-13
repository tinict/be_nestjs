import { ApiProperty } from '@nestjs/swagger';
export class CustomFieldTypeCreateModel {
  @ApiProperty({ name: 'name', example: 'CustomFieldType' })
  name: string;

  @ApiProperty({ name: 'description' })
  description: string;

  @ApiProperty({ name: 'parent_id' })
  parent_id: string;

  @ApiProperty({ name: 'display_order' })
  display_order: number;
}
