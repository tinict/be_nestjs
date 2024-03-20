import { CandidateSkillEntity } from '../entities';

export class CandidateSkillFields {
  init = () => {
    const entity = new CandidateSkillEntity();
    return entity;
  };

  static allowRelationKey = Object.freeze({});

  static allowQueryField = Object.freeze({
    q: ['Name', 'Description'],
  });
}
