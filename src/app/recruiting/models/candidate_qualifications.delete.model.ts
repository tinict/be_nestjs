import { ApiProperty } from '@nestjs/swagger';
export class CandidateQualificationDeleteModel {
  @ApiProperty({ name: 'ids' })
  ids: string[];
}
