import { ApiProperty } from '@nestjs/swagger';
import { CandidateWorkingHistoryUpdateModel } from './candidate_working_histories.update.model';

export class CandidateWorkingHistoryBulkModel {
  @ApiProperty({ name: 'items', type: [CandidateWorkingHistoryUpdateModel] })
  public items: CandidateWorkingHistoryUpdateModel[];
}
