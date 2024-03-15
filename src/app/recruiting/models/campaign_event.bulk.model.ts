import { ApiProperty } from '@nestjs/swagger';
import { CampaignEventUpdateModel } from './campaign_event.update.model';

export class CampaignEventBulkModel {
  @ApiProperty({ name: 'items', type: [CampaignEventUpdateModel] })
  public items: CampaignEventUpdateModel[];
}
