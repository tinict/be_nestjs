import { PositionEntity } from '../entities';

export class PositionFields {
  init = () => {
    const entity = new PositionEntity();
    return entity;
  };

  static allowRelationKey = Object.freeze({});

  static allowQueryField = Object.freeze({
    q: ['Name', 'Description'],
  });
}