import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { PaginationModel } from '../../../models';
import { ProposalFields } from '../fields';

export class ProposalQueryModel extends PaginationModel {
  @ApiProperty({ name: 'q', required: false })
  q: string;

  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(ProposalFields.allowRelationKey).join(','),
  })
  include: string;
}
