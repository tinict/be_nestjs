import { CustomFieldValueEntity } from '../entities';

export class CustomFieldValueFields {
  init = () => {
    const entity = new CustomFieldValueEntity();
    entity.CustomFieldId = undefined;
    return entity;
  };

  static allowRelationKey = Object.freeze({});

  static allowQueryField = Object.freeze({
    custom_field_id: 'CustomFieldId',
    q: ['Name', 'Description'],
  });
}
