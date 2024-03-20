import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { PaginationModel } from '../../../models';
import { CampaignPlanFields } from '../fields';

export class CampaignPlanQueryModel extends PaginationModel {
  @ApiProperty({ name: 'q', required: false })
  q: string;

  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CampaignPlanFields.allowRelationKey).join(','),
  })
  include: string;
}