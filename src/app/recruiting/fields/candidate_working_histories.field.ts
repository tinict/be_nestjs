import { CandidateWorkingHistoryEntity } from '../entities';

export class CandidateWorkingHistoryFields {
  init = () => {
    const entity = new CandidateWorkingHistoryEntity();
    return entity;
  };

  static allowRelationKey = Object.freeze({});

  static allowQueryField = Object.freeze({
    q: ['Name', 'Description'],
  });
}
