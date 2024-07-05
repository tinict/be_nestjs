import { UserEntity } from '../entities';

export class UserFields {
  init = () => {
    const entity = new UserEntity();
    return entity;
  };

  static allowRelationKey = Object.freeze({});

  static allowQueryField = Object.freeze({
    q: ['Name', 'Description'],
  });
}
