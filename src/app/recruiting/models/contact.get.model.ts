import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { ContactFields } from '../fields';

export class ContactGetModel {
  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(ContactFields.allowRelationKey).join(','),
  })
  include: string;
}
