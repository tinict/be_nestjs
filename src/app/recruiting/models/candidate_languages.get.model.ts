import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { CandidateLanguageFields } from '../fields';

export class CandidateLanguageGetModel {
  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CandidateLanguageFields.allowRelationKey).join(','),
  })
  include: string;
}
