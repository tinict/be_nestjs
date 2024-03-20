import * as _ from 'lodash';

import {  CandidateEntity } from '../entities';
import { BaseMapper } from '../../../mappers/base.mapper';

export class CandidateMapper {
  static toCandidate = (entity: CandidateEntity) => ({
    ...BaseMapper.toBaseMapper(entity),
  });

  static toCandidates = (entities: CandidateEntity[]) =>
    _.map(entities, CandidateMapper.toCandidate);
}
