import * as _ from 'lodash';

import { CustomFieldEntity } from '../entities';
import { BaseMapper } from '../../../../mappers/base.mapper';
import { CustomFieldValueMapper } from './custom-field-value.mapper';

export class CustomFieldMapper {
  static toCustomField = (entity: CustomFieldEntity) => ({
    ...BaseMapper.toBaseMapper(entity),
    custom_field_values: entity?.CustomFieldValues
      ? CustomFieldValueMapper.toCustomFieldValues(entity.CustomFieldValues)
      : undefined,
  });

  static toCustomFields = (entities: CustomFieldEntity[]) =>
    _.map(entities, CustomFieldMapper.toCustomField);
}
