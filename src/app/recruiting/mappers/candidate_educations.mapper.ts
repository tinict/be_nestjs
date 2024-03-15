import * as _ from 'lodash';

import {  CandidateEducationEntity } from '../entities';
import { BaseMapper } from '../../../mappers/base.mapper';

export class CandidateEducationMapper {
  static toCandidateEducation = (entity: CandidateEducationEntity) => ({
    ...BaseMapper.toBaseMapper(entity),
  });

  static toCandidateEducations = (entities: CandidateEducationEntity[]) =>
    _.map(entities, CandidateEducationMapper.toCandidateEducation);
}
