import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { CampaignChannelFields } from '../fields';

export class CampaignChannelGetModel {
  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CampaignChannelFields.allowRelationKey).join(','),
  })
  include: string;
}
