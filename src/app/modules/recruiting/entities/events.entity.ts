import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../entities/base';

@Entity({ name: 'rec_events' })
export class EventEntity extends BaseEntity {}