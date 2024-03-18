import { ApiProperty } from '@nestjs/swagger';
export class CampaignPlanDeleteModel {
  @ApiProperty({ name: 'ids' })
  ids: string[];
}