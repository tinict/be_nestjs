import { ApiProperty } from '@nestjs/swagger';
import { CandidateQualificationUpdateModel } from './candidate_qualifications.update.model';

export class CandidateQualificationBulkModel {
  @ApiProperty({ name: 'items', type: [CandidateQualificationUpdateModel] })
  public items: CandidateQualificationUpdateModel[];
}
