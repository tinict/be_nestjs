import * as _ from 'lodash';

import {  PositionEntity } from '../entities';
import { BaseMapper } from '../../../mappers/base.mapper';

export class PositionMapper {
  static toPosition = (entity: PositionEntity) => ({
    ...BaseMapper.toBaseMapper(entity),
  });

  static toPositions = (entities: PositionEntity[]) =>
    _.map(entities, PositionMapper.toPosition);
}
