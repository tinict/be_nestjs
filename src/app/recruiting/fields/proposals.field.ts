import { ProposalEntity } from '../entities';

export class ProposalFields {
  init = () => {
    const entity = new ProposalEntity();
    return entity;
  };

  static allowRelationKey = Object.freeze({});

  static allowQueryField = Object.freeze({
    q: ['Name', 'Description'],
  });
}