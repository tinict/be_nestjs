import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { ProposalFields } from '../fields';

export class ProposalGetModel {
  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(ProposalFields.allowRelationKey).join(','),
  })
  include: string;
}
