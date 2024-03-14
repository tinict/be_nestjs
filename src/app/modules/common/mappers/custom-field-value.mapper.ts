import * as _ from 'lodash';

import { CustomFieldValueEntity } from '../entities';
import { BaseMapper } from '../../../../mappers/base.mapper';

export class CustomFieldValueMapper {
  static toCustomFieldValue = (entity: CustomFieldValueEntity) => ({
    ...BaseMapper.toBaseMapper(entity),
  });

  static toCustomFieldValues = (entities: CustomFieldValueEntity[]) =>
    _.map(entities, CustomFieldValueMapper.toCustomFieldValue);
}
