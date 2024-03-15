import { ApiProperty } from '@nestjs/swagger';
export class CampaignProposalPositionConditionDeleteModel {
  @ApiProperty({ name: 'ids' })
  ids: string[];
}