import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { CampaignFields } from '../fields';

export class CampaignGetModel {
  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CampaignFields.allowRelationKey).join(','),
  })
  include: string;
}
