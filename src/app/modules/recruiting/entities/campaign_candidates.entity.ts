import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../entities/base';

@Entity({ name: 'rec_campaign_candidates' })
export class CampaignCandidateEntity extends BaseEntity {}