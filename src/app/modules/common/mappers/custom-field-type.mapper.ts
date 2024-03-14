import * as _ from 'lodash';

import { CustomFieldTypeEntity } from '../entities';
import { BaseMapper } from '../../../../mappers/base.mapper';

export class CustomFieldTypeMapper {
  static toCustomFieldType = (entity: CustomFieldTypeEntity) => ({
    ...BaseMapper.toBaseMapper(entity),
  });

  static toCustomFieldTypes = (entities: CustomFieldTypeEntity[]) =>
    _.map(entities, CustomFieldTypeMapper.toCustomFieldType);
}
