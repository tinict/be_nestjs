import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { CampaignContactFields } from '../fields';

export class CampaignCampaignContactGetModel {
  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CampaignContactFields.allowRelationKey).join(','),
  })
  include: string;
}
