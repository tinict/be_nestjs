import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { CandidateInterviewProcessFields } from '../fields';

export class CandidateInterviewProcessGetModel {
  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CandidateInterviewProcessFields.allowRelationKey).join(','),
  })
  include: string;
}
