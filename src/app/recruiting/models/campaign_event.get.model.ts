import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { CampaignEventFields } from '../fields';

export class CampaignEventGetModel {
  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CampaignEventFields.allowRelationKey).join(','),
  })
  include: string;
}