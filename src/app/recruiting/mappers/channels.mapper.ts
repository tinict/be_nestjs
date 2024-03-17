import * as _ from 'lodash';

import {  ChannelEntity } from '../entities';
import { BaseMapper } from '../../../mappers/base.mapper';

export class ChannelMapper {
  static toChannel = (entity: ChannelEntity) => ({
    ...BaseMapper.toBaseMapper(entity),
  });

  static toChannels = (entities: ChannelEntity[]) =>
    _.map(entities, ChannelMapper.toChannel);
}
