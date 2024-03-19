import { ApiProperty } from '@nestjs/swagger';
export class PositionCreateModel {
  @ApiProperty({ name: 'name', example: 'Position' })
  name: string;

  @ApiProperty({ name: 'description' })
  description: string;

  @ApiProperty({ name: 'parent_id' })
  parent_id: string;

  @ApiProperty({ name: 'display_order' })
  display_order: number;
}
