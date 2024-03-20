import { ChannelEntity } from '../entities';

export class ChannelFields {
  init = () => {
    const entity = new ChannelEntity();
    return entity;
  };

  static allowRelationKey = Object.freeze({});

  static allowQueryField = Object.freeze({
    q: ['Name', 'Description'],
  });
}