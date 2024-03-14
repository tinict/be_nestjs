import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { CustomFieldFields } from '../fields';

export class CustomFieldDetailModel {
  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CustomFieldFields.allowRelationKey).join(','),
  })
  include: string;
}
