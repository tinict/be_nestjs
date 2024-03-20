import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { PaginationModel } from '../../../models';
import { CandidateWorkingHistoryFields } from '../fields';

export class CandidateWorkingHistoryQueryModel extends PaginationModel {
  @ApiProperty({ name: 'q', required: false })
  q: string;

  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CandidateWorkingHistoryFields.allowRelationKey).join(','),
  })
  include: string;
}
