import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { CandidateEducationFields } from '../fields';

export class CandidateEducationGetModel {
  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CandidateEducationFields.allowRelationKey).join(','),
  })
  include: string;
}
