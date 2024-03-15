import { CampaignProposalPositionConditionEntity } from '../entities';

export class CampaignProposalPositionConditionFields {
  init = () => {
    const entity = new CampaignProposalPositionConditionEntity();
    return entity;
  };

  static allowRelationKey = Object.freeze({});

  static allowQueryField = Object.freeze({
    q: ['Name', 'Description'],
  });
}