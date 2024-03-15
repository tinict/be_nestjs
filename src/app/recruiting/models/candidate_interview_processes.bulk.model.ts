import { ApiProperty } from '@nestjs/swagger';
import { CandidateInterviewProcessUpdateModel } from './candidate_interview_processes.update.model';

export class CandidateInterviewProcessBulkModel {
  @ApiProperty({ name: 'items', type: [CandidateInterviewProcessUpdateModel] })
  public items: CandidateInterviewProcessUpdateModel[];
}
