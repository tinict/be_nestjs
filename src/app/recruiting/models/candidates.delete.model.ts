import { ApiProperty } from '@nestjs/swagger';
export class CandidateDeleteModel {
  @ApiProperty({ name: 'ids' })
  ids: string[];
}
