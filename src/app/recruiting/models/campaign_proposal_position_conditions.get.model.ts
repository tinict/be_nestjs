import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { CampaignProposalPositionConditionFields } from '../fields';

export class CampaignProposalPositionConditionGetModel {
  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CampaignProposalPositionConditionFields.allowRelationKey).join(','),
  })
  include: string;
}