import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';

export class OrganizationDetailModel {
  @ApiProperty({
    name: 'include',
    required: false,
  })
  include: string;
}
