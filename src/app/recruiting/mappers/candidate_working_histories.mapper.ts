import * as _ from 'lodash';

import { CandidateWorkingHistoryEntity } from '../entities';
import { BaseMapper } from '../../../mappers/base.mapper';

export class CandidateWorkingHistoryMapper {
  static toCandidateWorkingHistory = (entity: CandidateWorkingHistoryEntity) => ({
    ...BaseMapper.toBaseMapper(entity),
  });

  static toCandidateWorkingHistoryes = (entities: CandidateWorkingHistoryEntity[]) =>
    _.map(entities, CandidateWorkingHistoryMapper.toCandidateWorkingHistory);
}