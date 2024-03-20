import { EventEntity } from '../entities';

export class EventFields {
  init = () => {
    const entity = new EventEntity();
    return entity;
  };

  static allowRelationKey = Object.freeze({});

  static allowQueryField = Object.freeze({
    q: ['Name', 'Description'],
  });
}