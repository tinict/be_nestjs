import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../entities/base';

@Entity({ name: 'rec_campaign_contacts' })
export class CampaignContactEntity extends BaseEntity {}