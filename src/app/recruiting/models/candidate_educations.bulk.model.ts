import { ApiProperty } from '@nestjs/swagger';
import { CandidateEducationUpdateModel } from './candidate_educations.update.model';

export class CandidateEducationBulkModel {
  @ApiProperty({ name: 'items', type: [CandidateEducationUpdateModel] })
  public items: CandidateEducationUpdateModel[];
}
