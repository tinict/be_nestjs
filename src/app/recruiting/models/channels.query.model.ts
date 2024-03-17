import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { PaginationModel } from '../../../models';
import { ChannelFields } from '../fields';

export class ChannelQueryModel extends PaginationModel {
  @ApiProperty({ name: 'q', required: false })
  q: string;

  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(ChannelFields.allowRelationKey).join(','),
  })
  include: string;
}
