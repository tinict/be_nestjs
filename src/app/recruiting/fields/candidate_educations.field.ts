import { CandidateEducationEntity } from '../entities';

export class CandidateEducationFields {
  init = () => {
    const entity = new CandidateEducationEntity();
    return entity;
  };

  static allowRelationKey = Object.freeze({});

  static allowQueryField = Object.freeze({
    q: ['Name', 'Description'],
  });
}