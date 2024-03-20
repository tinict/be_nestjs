import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { CandidateFields } from '../fields';

export class CandidateGetModel {
  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CandidateFields.allowRelationKey).join(','),
  })
  include: string;
}
