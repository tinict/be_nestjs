import * as _ from 'lodash';

import {  ProposalEntity } from '../entities';
import { BaseMapper } from '../../../mappers/base.mapper';

export class ProposalMapper {
  static toProposal = (entity: ProposalEntity) => ({
    ...BaseMapper.toBaseMapper(entity),
  });

  static toProposals = (entities: ProposalEntity[]) =>
    _.map(entities, ProposalMapper.toProposal);
}
