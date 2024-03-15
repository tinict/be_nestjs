import * as _ from 'lodash';

import { ApiProperty } from '@nestjs/swagger';
import { PaginationModel } from '../../../models';
import { CampaignChannelFields } from '../fields';

export class CampaignChannelQueryModel extends PaginationModel {
  @ApiProperty({ name: 'q', required: false })
  q: string;

  @ApiProperty({
    name: 'include',
    required: false,
    example: _.keys(CampaignChannelFields.allowRelationKey).join(','),
  })
  include: string;
}
