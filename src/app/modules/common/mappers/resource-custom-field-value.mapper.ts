import * as _ from 'lodash';

import { ResourceCustomFieldValueEntity } from '../entities';
import { BaseMapper } from '../../../../mappers/base.mapper';
import { CustomFieldMapper } from './custom-field.mapper';
import { CustomFieldValueMapper } from './custom-field-value.mapper';

export class ResourceCustomFieldValueMapper {
  static toResourceCustomFieldValue = (
    entity: ResourceCustomFieldValueEntity,
  ) => ({
    ...BaseMapper.toBaseMapper(entity),
    custom_field: entity?.CustomField
      ? CustomFieldMapper.toCustomField(entity.CustomField)
      : undefined,
    custom_field_value: entity?.CustomFieldValue
      ? CustomFieldValueMapper.toCustomFieldValue(entity.CustomFieldValue)
      : undefined,
  });

  static toResourceCustomFieldValues = (
    entities: ResourceCustomFieldValueEntity[],
  ) =>
    _.map(entities, ResourceCustomFieldValueMapper.toResourceCustomFieldValue);
}
