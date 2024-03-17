import { ApiProperty } from '@nestjs/swagger';
export class CampaignContactDeleteModel {
  @ApiProperty({ name: 'ids' })
  ids: string[];
}
