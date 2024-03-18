import * as _ from 'lodash';

import {  CampaignInternalReferCandidateEntity } from '../entities';
import { BaseMapper } from '../../../mappers/base.mapper';

export class CampaignInternalReferCandidateMapper {
  static toCampaignInternalReferCandidate = (entity: CampaignInternalReferCandidateEntity) => ({
    ...BaseMapper.toBaseMapper(entity),
  });

  static toCampaignInternalReferCandidates = (entities: CampaignInternalReferCandidateEntity[]) =>
    _.map(entities, CampaignInternalReferCandidateMapper.toCampaignInternalReferCandidate);
}
