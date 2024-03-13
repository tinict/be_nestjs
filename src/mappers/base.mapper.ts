import * as _ from 'lodash';

export class BaseMapper {
  static toBaseMapper = (entity: any) => ({
    id: _.get(entity, 'Id'),
    name: _.get(entity, 'Name'),
    description: _.get(entity, 'Description'),
    display_order: parseFloat(_.get(entity, 'DisplayOrder')),
    color: _.get(entity, 'Color'),
    code: _.get(entity, 'Code'),
    created_date: _.get(entity, 'CreatedDate'),
    created_by: _.get(entity, 'CreatedBy'),
    updated_date: _.get(entity, 'LastUpdateDate'),
    updated_by: _.get(entity, 'UpdatedBy'),
    deleted_date: _.get(entity, 'DeleteDate'),
    deleted_by: _.get(entity, 'DeleteBy'),
    parent_id: _.get(entity, 'ParentId'),
  });
}
