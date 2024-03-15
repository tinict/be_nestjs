import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { IAMRole } from './iam.role.entity';
import { IAMResourceAccess } from './iam.resource-access.entity';
import { BaseEntity } from 'src/entities/base';

@Entity({ name: 'iam_policies' })
export class IAMPolicy extends BaseEntity {
  @Column({ name: 'application_id', type: 'varchar', length: 36 })
  ApplicationId!: string;

  @Column({ name: 'role_id', type: 'varchar', length: 36, nullable: true })
  RoleId!: string;

  @ManyToOne(() => IAMRole, (entity) => entity.IAMPolicies)
  @JoinColumn({ name: 'role_id' })
  Role!: IAMRole;

  @OneToMany(() => IAMResourceAccess, (entity) => entity.IAMPolicy)
  IAMResourceAccesses!: IAMResourceAccess[];

  @ManyToMany(() => IAMRole, (entity) => entity.IAMPolicies)
  IAMRoles: IAMRole[];
}
