import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { PaginationModel } from '../../../models';

export class OrganizationQueryModel extends PaginationModel {
  @ApiProperty({ name: 'q', required: false })
  q: string;

  @ApiProperty({
    name: 'include',
    required: false,
  })
  include: string;

  @ApiProperty({ name: 'chapter_id', required: false })
  chapter_id: string;

  @ApiProperty({ name: 'user_id', required: false })
  user_id: string;

  @ApiProperty({ name: 'parent_id', required: false })
  parent_id: string;
}
