import { CampaignInternalReferCandidateEntity } from '../entities';

export class CampaignInternalReferCandidateFields {
  init = () => {
    const entity = new CampaignInternalReferCandidateEntity();
    return entity;
  };

  static allowRelationKey = Object.freeze({});

  static allowQueryField = Object.freeze({
    q: ['Name', 'Description'],
  });
}