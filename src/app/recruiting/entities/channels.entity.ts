import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../entities/base';

@Entity({ name: 'rec_channels' })
export class ChannelEntity extends BaseEntity {}