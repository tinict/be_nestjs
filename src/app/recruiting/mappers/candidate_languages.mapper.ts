import * as _ from 'lodash';

import { CandidateLanguageEntity } from '../entities';
import { BaseMapper } from '../../../mappers/base.mapper';

export class CandidateLanguageMapper {
  static toCandidateLanguage = (entity: CandidateLanguageEntity) => ({
    ...BaseMapper.toBaseMapper(entity),
  });

  static toCandidateLanguagees = (entities: CandidateLanguageEntity[]) =>
    _.map(entities, CandidateLanguageMapper.toCandidateLanguage);
}
