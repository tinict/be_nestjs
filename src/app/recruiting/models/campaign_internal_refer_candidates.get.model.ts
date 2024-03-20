import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { CampaignInternalReferCandidateFields } from '../fields';

export class CampaignInternalReferCandidateGetModel {
  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CampaignInternalReferCandidateFields.allowRelationKey).join(','),
  })
  include: string;
}