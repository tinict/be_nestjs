import * as _ from 'lodash';

import { ResourceCustomFieldEntity } from '../entities';
import { BaseMapper } from '../../../mappers/base.mapper';
import { CustomFieldMapper } from './custom-field.mapper';

export class ResourceCustomFieldMapper {
  static toResourceCustomField = (entity: ResourceCustomFieldEntity) => ({
    ...BaseMapper.toBaseMapper(entity),
    custom_field: entity?.CustomField
      ? CustomFieldMapper.toCustomField(entity.CustomField)
      : undefined,
  });

  static toResourceCustomFields = (entities: ResourceCustomFieldEntity[]) =>
    _.map(entities, ResourceCustomFieldMapper.toResourceCustomField);
}
