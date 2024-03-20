import { CampaignContactEntity } from '../entities';

export class CampaignContactFields {
  init = () => {
    const entity = new CampaignContactEntity();
    return entity;
  };

  static allowRelationKey = Object.freeze({});

  static allowQueryField = Object.freeze({
    q: ['Name', 'Description'],
  });
}