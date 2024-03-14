import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { PaginationModel } from 'src/models';

export class UserDetailModel {
  @ApiProperty({
    name: 'include',
    required: false,
  })
  include: string;
}
