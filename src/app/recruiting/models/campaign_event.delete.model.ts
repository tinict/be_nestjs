import { ApiProperty } from '@nestjs/swagger';
export class CampaignEventDeleteModel {
  @ApiProperty({ name: 'ids' })
  ids: string[];
}