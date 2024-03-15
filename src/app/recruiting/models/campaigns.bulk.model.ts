import { ApiProperty } from '@nestjs/swagger';
import { CampaignUpdateModel } from './campaigns.update.model';

export class CampaignBulkModel {
  @ApiProperty({ name: 'items', type: [CampaignUpdateModel] })
  public items: CampaignUpdateModel[];
}
