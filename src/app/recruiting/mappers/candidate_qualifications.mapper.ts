import * as _ from 'lodash';

import { CandidateQualificationEntity } from '../entities';
import { BaseMapper } from '../../../mappers/base.mapper';

export class CandidateQualificationMapper {
  static toCandidateQualification = (entity: CandidateQualificationEntity) => ({
    ...BaseMapper.toBaseMapper(entity),
  });

  static toCandidateQualificationes = (entities: CandidateQualificationEntity[]) =>
    _.map(entities, CandidateQualificationMapper.toCandidateQualification);
}
