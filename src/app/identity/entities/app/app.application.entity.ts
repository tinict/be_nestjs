import { BaseEntity } from 'src/entities/base';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { IAMGroup } from '../iam/iam.group.entity';

@Entity({ name: 'app_applications' })
export class ApplicationEntity extends BaseEntity {
  
  @Column({ name: 'status', type: 'nvarchar', length: 255, default: 'un-activated' })
  Status: string;

  @Column({ name: 'app_icon', type: 'nvarchar', length: 255 })
  app_icon: string

  @OneToMany(() => IAMGroup, (entity) => entity.Application)
  IAMGroups : IAMGroup[];
}
