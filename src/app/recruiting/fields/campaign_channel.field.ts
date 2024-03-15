import { CampaignChannelEntity } from '../entities';

export class CampaignChannelFields {
  init = () => {
    const entity = new CampaignChannelEntity();
    return entity;
  };

  static allowRelationKey = Object.freeze({});

  static allowQueryField = Object.freeze({
    q: ['Name', 'Description'],
  });
}