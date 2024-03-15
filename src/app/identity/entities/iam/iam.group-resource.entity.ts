import { BaseEntity } from 'src/entities/base';
import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IAMGroup } from './iam.group.entity';
/**
 * [user_id,
 * user_name,
 * password,
 * email_address,
 * delete_flag,
 * create_by,
 * create_at,
 * last_update_by,
 * last_update_at,
 * enable_flag,
 * locked_flag,
 * user_type]
 */

/**
 * ide_user: Identity organization table
 */
@Entity({ name: 'iam_group_resources' })
export class IAMGroupResource extends BaseEntity {
  @Column({ name: 'group_id', type: 'varchar', length: 36, nullable: true })
  GroupId!: string;

  @ManyToOne(() => IAMGroup, (entity) => entity.IAMGroupResources)
  @JoinColumn({ name: 'group_id' })
  IAMGroup!: IAMGroup;

  @Column({ name: 'resource_id', type: 'varchar', length: 36, nullable: true })
  ResourceId!: string;

  @Column({
    name: 'resource_type',
    type: 'varchar',
    length: 36,
    nullable: true,
  })
  ResourceType!: string;
}
