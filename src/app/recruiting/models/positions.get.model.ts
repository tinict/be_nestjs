import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { PositionFields } from '../fields';

export class PositionGetModel {
  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(PositionFields.allowRelationKey).join(','),
  })
  include: string;
}
