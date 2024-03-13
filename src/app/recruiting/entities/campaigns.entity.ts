import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../entities/base';

@Entity({ name: 'rec_campaigns' })
export class CampaignEntity extends BaseEntity {}