import * as _ from 'lodash';

import { CandidateInterviewProcessEntity } from '../entities';
import { BaseMapper } from '../../../mappers/base.mapper';

export class CandidateInterviewProcessMapper {
  static toCandidateInterviewProcess = (entity: CandidateInterviewProcessEntity) => ({
    ...BaseMapper.toBaseMapper(entity),
  });

  static toCandidateInterviewProcesses = (entities: CandidateInterviewProcessEntity[]) =>
    _.map(entities, CandidateInterviewProcessMapper.toCandidateInterviewProcess);
}
