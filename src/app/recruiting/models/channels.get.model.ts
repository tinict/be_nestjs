import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { ChannelFields } from '../fields';

export class ChannelGetModel {
  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(ChannelFields.allowRelationKey).join(','),
  })
  include: string;
}
