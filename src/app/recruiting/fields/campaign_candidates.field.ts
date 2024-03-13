import { CampaignCandidateEntity } from '../entities';

export class CampaignCandidateFields {
  init = () => {
    const entity = new CampaignCandidateEntity();
    return entity;
  };

  static allowRelationKey = Object.freeze({});

  static allowQueryField = Object.freeze({
    q: ['Name', 'Description'],
  });
}
