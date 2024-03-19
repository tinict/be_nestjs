import { SkillEntity } from '../entities';

export class SkillFields {
  init = () => {
    const entity = new SkillEntity();
    return entity;
  };

  static allowRelationKey = Object.freeze({});

  static allowQueryField = Object.freeze({
    q: ['Name', 'Description'],
  });
}