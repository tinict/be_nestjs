import * as _ from 'lodash';

import {  SkillEntity } from '../entities';
import { BaseMapper } from '../../../mappers/base.mapper';

export class SkillMapper {
  static toSkill = (entity: SkillEntity) => ({
    ...BaseMapper.toBaseMapper(entity),
  });

  static toSkills = (entities: SkillEntity[]) =>
    _.map(entities, SkillMapper.toSkill);
}