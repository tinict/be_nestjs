import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { PaginationModel } from '../../../models';
import { CustomFieldTypeFields } from '../fields';

export class CustomFieldTypeQueryModel extends PaginationModel {
  @ApiProperty({ name: 'q', required: false })
  q: string;

  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CustomFieldTypeFields.allowRelationKey).join(','),
  })
  include: string;
}
