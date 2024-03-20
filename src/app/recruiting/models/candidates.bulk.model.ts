import { ApiProperty } from '@nestjs/swagger';
import { CandidateUpdateModel } from './Candidates.update.model';

export class CandidateBulkModel {
  @ApiProperty({ name: 'items', type: [CandidateUpdateModel] })
  public items: CandidateUpdateModel[];
}
