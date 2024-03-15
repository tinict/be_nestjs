import { CampaignEntity } from '../entities';

export class CampaignFields {
  init = () => {
    const entity = new CampaignEntity();
    return entity;
  };

  static allowRelationKey = Object.freeze({});

  static allowQueryField = Object.freeze({
    q: ['Name', 'Description'],
  });
}