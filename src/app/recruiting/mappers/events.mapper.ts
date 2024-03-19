import * as _ from 'lodash';

import {  EventEntity } from '../entities';
import { BaseMapper } from '../../../mappers/base.mapper';

export class EventMapper {
  static toEvent = (entity: EventEntity) => ({
    ...BaseMapper.toBaseMapper(entity),
  });

  static toEvents = (entities: EventEntity[]) =>
    _.map(entities, EventMapper.toEvent);
}
