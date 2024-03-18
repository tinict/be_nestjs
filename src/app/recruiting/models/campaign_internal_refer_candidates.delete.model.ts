import { ApiProperty } from '@nestjs/swagger';
export class CampaignInternalReferCandidateDeleteModel {
  @ApiProperty({ name: 'ids' })
  ids: string[];
}