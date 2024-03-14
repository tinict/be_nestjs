import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../entities/base';

@Entity({ name: 'rec_interview_processes' })
export class InterviewProcessEntity extends BaseEntity {}