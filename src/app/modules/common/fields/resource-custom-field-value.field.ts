import { ResourceCustomFieldValueEntity } from '../entities';

export class ResourceCustomFieldValueFields {
  init = () => {
    const entity = new ResourceCustomFieldValueEntity();
    entity.CustomField = undefined;
    entity.CustomFieldValue = undefined;
    return entity;
  };

  static allowRelationKey = Object.freeze({
    custom_field: 'CustomField',
    custom_field_value: 'CustomFieldValue',
  });

  static allowQueryField = Object.freeze({
    q: ['Name', 'Description'],
  });
}
