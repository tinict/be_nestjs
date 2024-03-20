import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { CandidateQualificationFields } from '../fields';

export class CandidateQualificationGetModel {
  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CandidateQualificationFields.allowRelationKey).join(','),
  })
  include: string;
}
