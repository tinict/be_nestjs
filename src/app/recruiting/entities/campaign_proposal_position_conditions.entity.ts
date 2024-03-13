import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../entities/base';

@Entity({ name: 'rec_campaign_proposal_position_conditions' })
export class CampaignProposalPositionConditionEntity extends BaseEntity {}