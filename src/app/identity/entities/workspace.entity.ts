import { Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../entities/base';
import { OrganizationEntity } from './organization.entity';

@Entity({ name: 'ide_workspaces' })
export class WorkspaceEntity extends BaseEntity {
  @OneToMany(() => OrganizationEntity, (organization) => organization.Workspace)
  public Organizations!: OrganizationEntity[];
}
