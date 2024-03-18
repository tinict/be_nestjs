import { ContactSkillEntity } from '../entities';

export class ContactSkillFields {
  init = () => {
    const entity = new ContactSkillEntity();
    return entity;
  };

  static allowRelationKey = Object.freeze({});

  static allowQueryField = Object.freeze({
    q: ['Name', 'Description'],
  });
}