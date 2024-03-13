import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { CustomFieldTypeFields } from '../fields';

export class CustomFieldTypeDetailModel {
  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CustomFieldTypeFields.allowRelationKey).join(','),
  })
  include: string;
}
