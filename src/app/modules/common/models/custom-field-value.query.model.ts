import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { PaginationModel } from '../../../../models';
import { CustomFieldValueFields } from '../fields';

export class CustomFieldValueQueryModel extends PaginationModel {
  @ApiProperty({ name: 'q', required: false })
  q: string;

  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CustomFieldValueFields.allowRelationKey).join(','),
  })
  include: string;

  @ApiProperty({ name: 'custom_field_id' })
  custom_field_id: string;
}
