import { CandidateLanguageEntity } from '../entities';

export class CandidateLanguageFields {
  init = () => {
    const entity = new CandidateLanguageEntity();
    return entity;
  };

  static allowRelationKey = Object.freeze({});

  static allowQueryField = Object.freeze({
    q: ['Name', 'Description'],
  });
}
