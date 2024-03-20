import * as _ from 'lodash';

import {  ContactSkillEntity } from '../entities';
import { BaseMapper } from '../../../mappers/base.mapper';

export class ContactSkillMapper {
  static toContactSkill = (entity: ContactSkillEntity) => ({
    ...BaseMapper.toBaseMapper(entity),
  });

  static toContactSkills = (entities: ContactSkillEntity[]) =>
    _.map(entities, ContactSkillMapper.toContactSkill);
}
