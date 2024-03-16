import { CandidateQualificationEntity } from '../entities';

export class CandidateQualificationFields {
  init = () => {
    const entity = new CandidateQualificationEntity();
    return entity;
  };

  static allowRelationKey = Object.freeze({});

  static allowQueryField = Object.freeze({
    q: ['Name', 'Description'],
  });
}
