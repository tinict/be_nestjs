import * as _ from 'lodash';

import {  CampaignCandidateEntity } from '../entities';
import { BaseMapper } from '../../../mappers/base.mapper';

export class CampaignCandidateMapper {
  static toCampaignCandidate = (entity: CampaignCandidateEntity) => ({
    ...BaseMapper.toBaseMapper(entity),
  });

  static toCampaignCandidates = (entities: CampaignCandidateEntity[]) =>
    _.map(entities, CampaignCandidateMapper.toCampaignCandidate);
}
