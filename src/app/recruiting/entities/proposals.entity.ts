import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../entities/base';

@Entity({ name: 'rec_proposals' })
export class ProposalEntity extends BaseEntity {}