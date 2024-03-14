import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../entities/base';

@Entity({ name: 'rec_campaign_plans' })
export class CampaignPlanEntity extends BaseEntity {}