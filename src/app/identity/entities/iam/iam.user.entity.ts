import { BaseEntity } from 'src/entities/base';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { IAMGroup } from './iam.group.entity';
import { IAMUserResource } from './iam.user-resource.entity';

@Entity({ name: 'iam_users' })
export class IAMUser extends BaseEntity { 
  @OneToMany(() => IAMUserResource, (entity) => entity.IAMUser)
  IAMUserResources!: IAMUserResource[];

  @Column({ name: 'user_id', type: 'varchar', length: 36 })
  UserId!: string;

  // @OneToOne(() => IdeUserEntity, (entity) => entity.IAMUser)
  // @JoinColumn({ name: 'user_id' })
  // User!: IdeUserEntity;
 

  // @OneToMany(() => ApplicationInUseEntity, (entity) => entity.IAMUser)
  // ApplicationInUses: ApplicationInUseEntity[];
}
