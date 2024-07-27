import * as _ from 'lodash';

import { UserEntity } from '../entities';
import { BaseMapper } from '../../../mappers/base.mapper';

export class UserMapper {
  static toUser = (entity: UserEntity) => ({
    ...BaseMapper.toBaseMapper(entity),
    firstname: _.get(entity, 'Firstname'),
    lastname: _.get(entity, 'Lastname'),
    username: _.get(entity, 'Username'),
    gender: _.get(entity, 'Gender'),
    dob: _.get(entity, 'Dob'),
    phone: _.get(entity, 'Phone'),
    picture: _.get(entity, 'Picture'),
    email: _.get(entity, 'Email'),
    bio: _.get(entity, 'Bio'),
  });

  static toUsers = (entities: UserEntity[]) =>
    _.map(entities, UserMapper.toUser);
};
