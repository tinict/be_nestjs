import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../entities/base';

@Entity({ name: 'rec_candidate_interview_processes' })
export class CandidateInterviewProcessEntity extends BaseEntity {}