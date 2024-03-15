import { BaseEntity } from 'src/entities/base';
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { IAMPolicy } from './iam.policy.entity';

@Entity({ name: 'iam_resource_accesses' })
export class IAMResourceAccess extends BaseEntity {
  @Column({ name: 'application_id', type: 'varchar', length: 36 })
  ApplicationId!: string;

  @ManyToOne(() => IAMPolicy, (entity) => entity.IAMResourceAccesses)
  @JoinColumn({ name: 'policy' })
  IAMPolicy!: IAMPolicy;

  @JoinColumn({ name: 'resource_id' })
  ResourceId!: string;

  @Column({
    name: 'resource_type',
    type: 'varchar',
    length: 36,
    nullable: true,
  })
  ResourceType!: string;
}
