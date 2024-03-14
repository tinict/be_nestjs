import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../entities/base';

@Entity({ name: 'rec_campaign_internal_refer_candidates' })
export class CampaignInternalReferCandidateEntity extends BaseEntity {}