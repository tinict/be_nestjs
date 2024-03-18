import { CampaignPlanEntity } from '../entities';

export class CampaignPlanFields {
  init = () => {
    const entity = new CampaignPlanEntity();
    return entity;
  };

  static allowRelationKey = Object.freeze({});

  static allowQueryField = Object.freeze({
    q: ['Name', 'Description'],
  });
}