import * as _ from 'lodash';

import {  CampaignContactEntity } from '../entities';
import { BaseMapper } from '../../../mappers/base.mapper';

export class CampaignContactMapper {
  static toCampaignContact = (entity: CampaignContactEntity) => ({
    ...BaseMapper.toBaseMapper(entity),
  });

  static toCampaignContacts = (entities: CampaignContactEntity[]) =>
    _.map(entities, CampaignContactMapper.toCampaignContact);
}
