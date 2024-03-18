import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { PaginationModel } from '../../../models';
import { ContactSkillFields } from '../fields';

export class ContactSkillQueryModel extends PaginationModel {
  @ApiProperty({ name: 'q', required: false })
  q: string;

  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(ContactSkillFields.allowRelationKey).join(','),
  })
  include: string;
}
