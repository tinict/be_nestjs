import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { CustomFieldValueFields } from '../fields';

export class CustomFieldValueDetailModel {
  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CustomFieldValueFields.allowRelationKey).join(','),
  })
  include: string;
}
