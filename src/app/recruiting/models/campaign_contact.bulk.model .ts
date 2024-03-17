import { ApiProperty } from '@nestjs/swagger';
import { CampaignContactUpdateModel } from './campaign_contact.update.model';

export class CampaignContactBulkModel {
  @ApiProperty({ name: 'items', type: [CampaignContactUpdateModel] })
  public items: CampaignContactUpdateModel[];
}
