import { ResourceCustomFieldEntity } from '../entities';

export class ResourceCustomFieldFields {
  init = () => {
    const entity = new ResourceCustomFieldEntity();
    entity.CustomField = undefined;
    return entity;
  };

  static allowRelationKey = Object.freeze({
    custom_field: 'CustomField',
  });

  static allowQueryField = Object.freeze({
    q: ['Name', 'Description'],
  });
}
