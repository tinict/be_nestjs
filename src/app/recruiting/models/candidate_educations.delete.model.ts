import { ApiProperty } from '@nestjs/swagger';
export class CandidateEducationDeleteModel {
  @ApiProperty({ name: 'ids' })
  ids: string[];
}