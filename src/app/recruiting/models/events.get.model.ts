import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { EventFields } from '../fields';

export class EventGetModel {
  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(EventFields.allowRelationKey).join(','),
  })
  include: string;
}
