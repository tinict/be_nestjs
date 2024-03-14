import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../entities/base';

@Entity({ name: 'rec_campaign_events' })
export class CampaignEventEntity extends BaseEntity {}