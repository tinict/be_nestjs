import { ApiProperty } from '@nestjs/swagger';
export class CampaignCandidateDeleteModel {
  @ApiProperty({ name: 'ids' })
  ids: string[];
}
