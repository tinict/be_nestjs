import { CampaignEventEntity } from '../entities';

export class CampaignEventFields {
  init = () => {
    const entity = new CampaignEventEntity();
    return entity;
  };

  static allowRelationKey = Object.freeze({});

  static allowQueryField = Object.freeze({
    q: ['Name', 'Description'],
  });
}