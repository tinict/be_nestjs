import {
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IAMUser } from './iam.user.entity';

@Entity({ name: 'iam_user_resources' })
export class IAMUserResource {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  Id: string;

  @Column({ name: 'iam_user_id', type: 'varchar', length: 36, nullable: true })
  IAMUserId!: string;

  @ManyToOne(() => IAMUser, (entity) => entity.IAMUserResources)
  @JoinColumn({ name: 'iam_user_id' })
  IAMUser!: IAMUser;

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
