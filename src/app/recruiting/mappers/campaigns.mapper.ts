import * as _ from 'lodash';

import {  CampaignEntity } from '../entities';
import { BaseMapper } from '../../../mappers/base.mapper';

export class CampaignMapper {
  static toCampaign = (entity: CampaignEntity) => ({
    ...BaseMapper.toBaseMapper(entity),
  });

  static toCampaigns = (entities: CampaignEntity[]) =>
    _.map(entities, CampaignMapper.toCampaign);
}
