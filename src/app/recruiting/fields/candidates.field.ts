import { CandidateEntity } from '../entities';

export class CandidateFields {
  init = () => {
    const entity = new CandidateEntity();
    return entity;
  };

  static allowRelationKey = Object.freeze({});

  static allowQueryField = Object.freeze({
    q: ['Name', 'Description'],
  });
}