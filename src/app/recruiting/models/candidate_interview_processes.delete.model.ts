import { ApiProperty } from '@nestjs/swagger';
export class CandidateInterviewProcessDeleteModel {
  @ApiProperty({ name: 'ids' })
  ids: string[];
}
