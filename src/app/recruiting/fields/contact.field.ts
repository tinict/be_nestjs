import { ContactEntity } from '../entities';

export class ContactFields {
  init = () => {
    const entity = new ContactEntity();
    return entity;
  };

  static allowRelationKey = Object.freeze({});

  static allowQueryField = Object.freeze({
    q: ['Name', 'Description'],
  });
}