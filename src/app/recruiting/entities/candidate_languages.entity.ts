import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../entities/base';

@Entity({ name: 'rec_candidate_languages' })
export class CandidateLanguageEntity extends BaseEntity {}