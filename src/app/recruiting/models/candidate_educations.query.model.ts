import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { PaginationModel } from '../../../models';
import { CandidateEducationFields } from '../fields';

export class CandidateEducationQueryModel extends PaginationModel {
  @ApiProperty({ name: 'q', required: false })
  q: string;

  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CandidateEducationFields.allowRelationKey).join(','),
  })
  include: string;
}
