import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../entities/base';

@Entity({ name: 'rec_candidate_educations' })
export class CandidateEducationEntity extends BaseEntity {}