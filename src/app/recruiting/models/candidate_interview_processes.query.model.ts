import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { PaginationModel } from '../../../models';
import { CandidateInterviewProcessFields } from '../fields';

export class CandidateInterviewProcessQueryModel extends PaginationModel {
  @ApiProperty({ name: 'q', required: false })
  q: string;

  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CandidateInterviewProcessFields.allowRelationKey).join(','),
  })
  include: string;
}
