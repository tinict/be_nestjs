import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { PaginationModel } from '../../../models';
import { CampaignInternalReferCandidateFields } from '../fields';

export class CampaignInternalReferCandidateQueryModel extends PaginationModel {
  @ApiProperty({ name: 'q', required: false })
  q: string;

  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CampaignInternalReferCandidateFields.allowRelationKey).join(','),
  })
  include: string;
}
