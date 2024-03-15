import { ApiProperty } from '@nestjs/swagger';
import { CampaignProposalPositionConditionUpdateModel } from './campaign_proposal_position_conditions.update.model';

export class CampaignProposalPositionConditionBulkModel {
  @ApiProperty({ name: 'items', type: [CampaignProposalPositionConditionUpdateModel] })
  public items: CampaignProposalPositionConditionUpdateModel[];
}
