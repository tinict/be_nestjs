import { ApiProperty } from '@nestjs/swagger';
import { CampaignInternalReferCandidateUpdateModel } from './campaign_internal_refer_candidates.update.model';

export class CampaignInternalReferCandidateBulkModel {
  @ApiProperty({ name: 'items', type: [CampaignInternalReferCandidateUpdateModel] })
  public items: CampaignInternalReferCandidateUpdateModel[];
}
