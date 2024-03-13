import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../entities/base';

@Entity({ name: 'rec_candidate_qualifications' })
export class CandidateQualificationEntity extends BaseEntity {}