import * as _ from 'lodash';

import {  UserEntity } from '../entities';
import { BaseMapper } from '../../../mappers/base.mapper';

export class UserMapper {
  static toUser = (entity: UserEntity) => ({
    ...BaseMapper.toBaseMapper(entity),
  });

  static toUsers = (entities: UserEntity[]) =>
    _.map(entities, UserMapper.toUser);
}
