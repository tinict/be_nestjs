import * as _ from 'lodash';

import {  CampaignEventEntity } from '../entities';
import { BaseMapper } from '../../../../mappers/base.mapper';

export class CampaignEventMapper {
  static toCampaignEvent = (entity: CampaignEventEntity) => ({
    ...BaseMapper.toBaseMapper(entity),
  });

  static toCampaignEvents = (entities: CampaignEventEntity[]) =>
    _.map(entities, CampaignEventMapper.toCampaignEvent);
}
