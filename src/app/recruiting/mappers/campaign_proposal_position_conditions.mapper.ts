import * as _ from 'lodash';

import {  CampaignProposalPositionConditionEntity } from '../entities';
import { BaseMapper } from '../../../mappers/base.mapper';

export class CampaignProposalPositionConditionMapper {
  static toCampaignProposalPositionCondition = (entity: CampaignProposalPositionConditionEntity) => ({
    ...BaseMapper.toBaseMapper(entity),
  });

  static toCampaignProposalPositionConditions = (entities: CampaignProposalPositionConditionEntity[]) =>
    _.map(entities, CampaignProposalPositionConditionMapper.toCampaignProposalPositionCondition);
}
