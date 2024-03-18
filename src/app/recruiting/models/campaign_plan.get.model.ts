import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { CampaignPlanFields } from '../fields';

export class CampaignPlanGetModel {
  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CampaignPlanFields.allowRelationKey).join(','),
  })
  include: string;
}