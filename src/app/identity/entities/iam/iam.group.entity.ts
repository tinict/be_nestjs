import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { IAMRole } from './iam.role.entity';
import { IAMUser } from './iam.user.entity';
import { IAMGroupResource } from './iam.group-resource.entity';
import { BaseEntity } from 'src/entities/base';
import { ApplicationEntity } from '../app/app.application.entity';
import { OrganizationEntity } from '../ide/organization.entity';

@Entity({ name: 'iam_groups' })
export class IAMGroup extends BaseEntity {
  @ManyToMany(() => IAMRole, (entity) => entity.IAMGroups)
  @JoinTable({
    name: 'iam_group_roles',
    joinColumn: {
      name: 'iam_group_id',
      referencedColumnName: 'Id',
    },
    inverseJoinColumn: {
      name: 'iam_role_id',
      referencedColumnName: 'Id',
    },
  })
  IAMRoles: IAMRole[];

  @OneToMany(() => IAMGroupResource, (entity) => entity.IAMGroup)
  IAMGroupResources!: IAMGroupResource[];

  @Column({ name: 'application_id', type: 'varchar', length: 36 })
  ApplicationId!: string;

  @ManyToOne(() => ApplicationEntity, (entity) => entity.IAMGroups)
  @JoinColumn({ name: 'application_id' })
  Application!: ApplicationEntity;

  // @OneToMany(() => ApplicationInUseEntity, (entity) => entity.IAMGroup)
  // ApplicationInUses: ApplicationInUseEntity[];

  @ManyToOne(() => OrganizationEntity, (entity) => entity.IAMGroups)
  @JoinColumn({ name: 'organization_id' })
  Organization!: OrganizationEntity;
}
