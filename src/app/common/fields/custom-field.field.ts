import { CustomFieldEntity } from '../entities';

export class CustomFieldFields {
  init = () => {
    const entity = new CustomFieldEntity();
    entity.CustomFieldValues = undefined;
    entity.CustomFieldTypeId = undefined;
    return entity;
  };

  static allowRelationKey = Object.freeze({
    custom_field_values: 'CustomFieldValues',
  });

  static allowQueryField = Object.freeze({
    custom_field_type_id: 'CustomFieldTypeId',
    q: ['Name', 'Description'],
  });
}
