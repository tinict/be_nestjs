import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { SkillFields } from '../fields';

export class SkillGetModel {
  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(SkillFields.allowRelationKey).join(','),
  })
  include: string;
}
