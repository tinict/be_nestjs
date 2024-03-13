import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { ResourceCustomFieldValueFields } from '../fields';

export class ResourceCustomFieldValueDetailModel {
  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(ResourceCustomFieldValueFields.allowRelationKey).join(','),
  })
  include: string;
}
