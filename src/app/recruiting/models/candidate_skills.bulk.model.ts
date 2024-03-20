import { ApiProperty } from '@nestjs/swagger';
import { CandidateSkillUpdateModel } from './candidate_skills.update.model';

export class CandidateSkillBulkModel {
  @ApiProperty({ name: 'items', type: [CandidateSkillUpdateModel] })
  public items: CandidateSkillUpdateModel[];
}
