import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { ContactSkillFields } from '../fields';

export class ContactSkillGetModel {
  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(ContactSkillFields.allowRelationKey).join(','),
  })
  include: string;
}
