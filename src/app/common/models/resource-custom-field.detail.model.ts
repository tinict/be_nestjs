import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { ResourceCustomFieldFields } from '../fields';

export class ResourceCustomFieldDetailModel {
  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(ResourceCustomFieldFields.allowRelationKey).join(','),
  })
  include: string;
}
