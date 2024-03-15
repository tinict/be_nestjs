import { ApiProperty } from '@nestjs/swagger';
export class CampaignChannelDeleteModel {
  @ApiProperty({ name: 'ids' })
  ids: string[];
}
