import * as _ from 'lodash';

import {  ContactEntity } from '../entities';
import { BaseMapper } from '../../../mappers/base.mapper';

export class ContactMapper {
  static toContact = (entity: ContactEntity) => ({
    ...BaseMapper.toBaseMapper(entity),
  });

  static toContacts = (entities: ContactEntity[]) =>
    _.map(entities, ContactMapper.toContact);
}
