import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../entities/base';

@Entity({ name: 'rec_candidate_working_histories' })
export class CandidateWorkingHistoryEntity extends BaseEntity {}