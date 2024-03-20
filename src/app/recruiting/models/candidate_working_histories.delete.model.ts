import { ApiProperty } from '@nestjs/swagger';
export class CandidateWorkingHistoryDeleteModel {
  @ApiProperty({ name: 'ids' })
  ids: string[];
}
