import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../entities/base';

@Entity({ name: 'rec_proposal_position_conditions' })
export class ProposalPositionConditionEntity extends BaseEntity {}