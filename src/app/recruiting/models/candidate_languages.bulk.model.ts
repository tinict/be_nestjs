import { ApiProperty } from '@nestjs/swagger';
import { CandidateLanguageUpdateModel } from './candidate_languages.update.model';

export class CandidateLanguageBulkModel {
  @ApiProperty({ name: 'items', type: [CandidateLanguageUpdateModel] })
  public items: CandidateLanguageUpdateModel[];
}
