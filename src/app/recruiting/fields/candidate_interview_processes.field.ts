import { CandidateInterviewProcessEntity } from '../entities';

export class CandidateInterviewProcessFields {
  init = () => {
    const entity = new CandidateInterviewProcessEntity();
    return entity;
  };

  static allowRelationKey = Object.freeze({});

  static allowQueryField = Object.freeze({
    q: ['Name', 'Description'],
  });
}
