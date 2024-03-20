import * as _ from 'lodash';

import {  CampaignPlanEntity } from '../entities';
import { BaseMapper } from '../../../mappers/base.mapper';

export class CampaignPlanMapper {
  static toCampaignPlan = (entity: CampaignPlanEntity) => ({
    ...BaseMapper.toBaseMapper(entity),
  });

  static toCampaignPlans = (entities: CampaignPlanEntity[]) =>
    _.map(entities, CampaignPlanMapper.toCampaignPlan);
}
