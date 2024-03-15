import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { PaginationModel } from '../../../models';
import { CampaignProposalPositionConditionFields } from '../fields';

export class CampaignProposalPositionConditionQueryModel extends PaginationModel {
  @ApiProperty({ name: 'q', required: false })
  q: string;

  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CampaignProposalPositionConditionFields.allowRelationKey).join(','),
  })
  include: string;
}