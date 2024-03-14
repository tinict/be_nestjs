import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { CampaignCandidateFields } from '../fields';

export class CampaignCandidateGetModel {
  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CampaignCandidateFields.allowRelationKey).join(','),
  })
  include: string;
}
