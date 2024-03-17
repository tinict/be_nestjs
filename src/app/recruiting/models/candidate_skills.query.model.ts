import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { PaginationModel } from '../../../models';
import { CandidateSkillFields } from '../fields';

export class CandidateSkillQueryModel extends PaginationModel {
  @ApiProperty({ name: 'q', required: false })
  q: string;

  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CandidateSkillFields.allowRelationKey).join(','),
  })
  include: string;
}
