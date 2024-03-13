import { ApiProperty } from '@nestjs/swagger';
import { CampaignCandidateUpdateModel } from './campaign_candidate.update.model';

export class CampaignCandidateBulkModel {
  @ApiProperty({ name: 'items', type: [CampaignCandidateUpdateModel] })
  public items: CampaignCandidateUpdateModel[];
}
