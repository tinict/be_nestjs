import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../entities/base';

@Entity({ name: 'rec_candidate_skills' })
export class CandidateSkillEntity extends BaseEntity {}