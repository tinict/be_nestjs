import { CustomFieldTypeEntity } from '../entities';

export class CustomFieldTypeFields {
  init = () => {
    const entity = new CustomFieldTypeEntity();
    entity.CustomFields = undefined;
    return entity;
  };

  static allowRelationKey = Object.freeze({});

  static allowQueryField = Object.freeze({
    q: ['Name', 'Description'],
  });
}
