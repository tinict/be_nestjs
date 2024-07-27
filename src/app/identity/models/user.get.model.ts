import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { UserFields } from '../fields';

export class UserGetModel {
  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(UserFields.allowRelationKey).join(','),
  })
  include: string;
};
