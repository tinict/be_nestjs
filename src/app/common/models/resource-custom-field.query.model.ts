import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { PaginationModel } from '../../../models';
import { ResourceCustomFieldFields } from '../fields';

export class ResourceCustomFieldQueryModel extends PaginationModel {
  @ApiProperty({ name: 'q', required: false })
  q: string;

  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(ResourceCustomFieldFields.allowRelationKey).join(','),
  })
  include: string;

  @ApiProperty({ name: 'resource_id' })
  resource_id: string;
}
