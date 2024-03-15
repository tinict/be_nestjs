import { ApiProperty } from '@nestjs/swagger';
export class CampaignEventCreateModel {
  @ApiProperty({ name: 'name', example: 'campaign Event' })
  name: string;

  @ApiProperty({ name: 'description' })
  description: string;

  @ApiProperty({ name: 'parent_id' })
  parent_id: string;

  @ApiProperty({ name: 'display_order' })
  display_order: number;
}