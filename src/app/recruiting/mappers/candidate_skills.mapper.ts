import * as _ from 'lodash';

import { CandidateSkillEntity } from '../entities';
import { BaseMapper } from '../../../mappers/base.mapper';

export class CandidateSkillMapper {
  static toCandidateSkill = (entity: CandidateSkillEntity) => ({
    ...BaseMapper.toBaseMapper(entity),
  });

  static toCandidateSkilles = (entities: CandidateSkillEntity[]) =>
    _.map(entities, CandidateSkillMapper.toCandidateSkill);
}
