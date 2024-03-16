import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { PaginationModel } from '../../../models';
import { CandidateQualificationFields } from '../fields';

export class CandidateQualificationQueryModel extends PaginationModel {
  @ApiProperty({ name: 'q', required: false })
  q: string;

  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CandidateQualificationFields.allowRelationKey).join(','),
  })
  include: string;
}
