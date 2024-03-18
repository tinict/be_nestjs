import { ApiProperty } from '@nestjs/swagger';
import { CampaignPlanUpdateModel } from './campaign_plan.update.model';

export class CampaignPlanBulkModel {
  @ApiProperty({ name: 'items', type: [CampaignPlanUpdateModel] })
  public items: CampaignPlanUpdateModel[];
}
