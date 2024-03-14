import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../entities/base';

@Entity({ name: 'rec_proposal_position_condition_skills' })
export class ProposalPositionConditionSkillEntity extends BaseEntity {}