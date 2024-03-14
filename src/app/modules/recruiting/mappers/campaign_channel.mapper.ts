import * as _ from 'lodash';

import {  CampaignChannelEntity } from '../entities';
import { BaseMapper } from '../../../../mappers/base.mapper';

export class CampaignChannelMapper {
  static toCampaignChannel = (entity: CampaignChannelEntity) => ({
    ...BaseMapper.toBaseMapper(entity),
  });

  static toCampaignChannels = (entities: CampaignChannelEntity[]) =>
    _.map(entities, CampaignChannelMapper.toCampaignChannel);
}
