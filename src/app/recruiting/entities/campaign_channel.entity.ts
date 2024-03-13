import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../entities/base';

@Entity({ name: 'rec_campaign_channels' })
export class CampaignChannelEntity extends BaseEntity {}