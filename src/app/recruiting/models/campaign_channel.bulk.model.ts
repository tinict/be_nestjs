import { ApiProperty } from '@nestjs/swagger';
import { CampaignChannelUpdateModel } from './campaign_channel.update.model';

export class CampaignChannelBulkModel {
  @ApiProperty({ name: 'items', type: [CampaignChannelUpdateModel] })
  public items: CampaignChannelUpdateModel[];
}
