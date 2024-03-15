import { ApiProperty } from '@nestjs/swagger';
export class CampaignDeleteModel {
  @ApiProperty({ name: 'ids' })
  ids: string[];
}
