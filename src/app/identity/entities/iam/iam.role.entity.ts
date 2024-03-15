import { BaseEntity } from 'src/entities/base';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { IAMGroup } from './iam.group.entity';
import { IAMPolicy } from './iam.policy.entity';

@Entity({ name: 'iam_roles' })
export class IAMRole extends BaseEntity {
  @Column({ name: 'application_id', type: 'varchar', length: 36 })
  ApplicationId!: string;

  @ManyToMany(() => IAMPolicy, (entity) => entity.IAMRoles)
  @JoinTable({
    name: 'iam_role_policies',
    joinColumn: {
      name: 'iam_role_id',
      referencedColumnName: 'Id',
    },
    inverseJoinColumn: {
      name: 'iam_policy_id',
      referencedColumnName: 'Id',
    },
  })
  IAMPolicies: IAMPolicy[];

  @ManyToMany(() => IAMGroup, (entity) => entity.IAMRoles)
  IAMGroups: IAMGroup[];
}
