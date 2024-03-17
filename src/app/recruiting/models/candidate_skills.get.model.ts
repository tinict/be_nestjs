import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { CandidateSkillFields } from '../fields';

export class CandidateSkillGetModel {
  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CandidateSkillFields.allowRelationKey).join(','),
  })
  include: string;
}
