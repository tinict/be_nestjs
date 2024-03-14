import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { PaginationModel } from '../../../../models';
import { CustomFieldFields } from '../fields';

export class CustomFieldQueryModel extends PaginationModel {
  @ApiProperty({ name: 'q', required: false })
  q: string;

  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CustomFieldFields.allowRelationKey).join(','),
  })
  include: string;

  @ApiProperty({ name: 'custom_field_type_id', required: false })
  custom_field_type_id: number;
}
