import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { PaginationModel } from '../../../models';
import { CampaignCandidateFields } from '../fields';

export class CampaignCandidateQueryModel extends PaginationModel {
  @ApiProperty({ name: 'q', required: false })
  q: string;

  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CampaignCandidateFields.allowRelationKey).join(','),
  })
  include: string;
}
