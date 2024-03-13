import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { PaginationModel } from 'src/models';

export class UserQueryModel extends PaginationModel {
  @ApiProperty({ name: 'q', required: false })
  q: string;

  @ApiProperty({
    name: 'include',
    required: false,
  })
  include: string;

  @ApiProperty({ name: 'chapter_id', required: false })
  chapter_id: string;

  @ApiProperty({ name: 'organization_id', required: false })
  organization_id: string;

  @ApiProperty({ name: 'phone', required: false })
  phone: string;

  @ApiProperty({ name: 'status', required: false })
  status: string;
}
