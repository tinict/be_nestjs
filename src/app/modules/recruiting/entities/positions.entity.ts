import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../entities/base';

@Entity({ name: 'rec_positions' })
export class PositionEntity extends BaseEntity {}