import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { CandidateWorkingHistoryFields } from '../fields';

export class CandidateWorkingHistoryGetModel {
  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CandidateWorkingHistoryFields.allowRelationKey).join(','),
  })
  include: string;
}
