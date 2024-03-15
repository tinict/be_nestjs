import { BaseEntity } from 'src/entities/base';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  OneToOne,
} from 'typeorm';
import { IAMGroup } from '../iam/iam.group.entity';
import { WorkspaceEntity } from './workspace.entity';


@Entity({ name: 'ide_organizations' })
export class OrganizationEntity extends BaseEntity {
  /**
   * Company size
   */
  @Column({ name: 'size', type: 'int', nullable: true, default: 0 })
  public Size: number;

  @Column({ name: 'status', type: 'int', nullable: true, default: 0 })
  public Status: number;

  //#region Properties
  /**
   * Phone
   */
  @Column({ name: 'phone', type: 'varchar', nullable: true })
  public Phone: string;

  @Column({ name: 'address', type: 'varchar', nullable: true })
  public Address: string;

  @Column({ name: 'country_id', type: 'varchar', nullable: true })
  public CountryId: string;

  @Column({ name: 'images', type: 'text', nullable: true })
  public Images: string;

  @Column({ name: 'websites', type: 'text', nullable: true })
  public Websites: string;

  @Column({ name: 'vision', type: 'text', nullable: true })
  public Vision: string;

  @Column({ name: 'mission', type: 'text', nullable: true })
  public Mission: string;

  @Column({ name: 'core_values', type: 'text', nullable: true })
  public CoreValues: string;

  @Column({ name: 'socials', type: 'text', nullable: true })
  public Socials: string;

  // silver, gold, platinum, diamond
  @Column({ name: 'grade', type: 'double', nullable: true })
  Grade: number;

  @Column({ name: 'rate', type: 'double', nullable: true })
  public Rate: number;

  @Column({ name: 'cover', type: 'text', nullable: true })
  public Cover: string;

  @Column({ name: 'avatar', type: 'text', nullable: true })
  public Avatar: string;

  /**
   * VerifyCode
   */
  @Column({ name: 'verify_code', type: 'varchar', nullable: true })
  public VerifyCode: string;

  /**
   * Email
   */
  @Column({ name: 'email', type: 'varchar', nullable: true })
  public Email: string;

  /**
   * Enable Flag
   */
  @Column({ name: 'enable_flag', type: 'tinyint', nullable: false, default: 0 })
  public EnableFlag: number;

  /**
   * Locked Flag
   */
  @Column({ name: 'locked_flag', type: 'tinyint', nullable: false, default: 0 })
  public LockedFlag: number;

  /**
   * Verified Flag
   */
  @Column({
    name: 'verified_flag',
    type: 'tinyint',
    nullable: false,
    default: 0,
  })
  public VerifiedFlag: number;

  //#endregion

  //#region References

  // @ManyToMany(() => UserGroup, group => group.Users)
  // @JoinTable()
  // UserGroups!: UserGroup[];

  // @Column({ name: 'organizationId', type: 'varchar', length: 36 })
  // OrganizationId!: string;

  // /**
  //  * Organization
  //  */
  // @ManyToOne(() => Organization, organization => organization.Users)
  // @JoinColumn({ name: 'organizationId' })
  // Organization!: Organization;

  // /**
  //  * User Login
  //  */
  // @OneToMany(() => UserLogin, userLogin => userLogin.User)
  // UserLogins!: UserLogin[];

  // /**
  //  * Secrect
  //  */
  // @OneToMany(() => UserSecrect, secrect => secrect.User)
  // UserSecrects!: UserSecrect[];

  // /**
  //  * Contracts
  //  */
  // @OneToMany(() => Contract, contract => contract.User)
  // Contracts!: Contract[];

  // /**
  //  * App UserLogins
  //  */
  // @OneToMany(() => AppUserLogin, appUserLogin => appUserLogin.User)
  // AppUserLogins!: AppUserLogin[];

  // @OneToMany(() => UserRole, userRole => userRole.User)
  // UserRoles!: UserRole[];

  //#endregion

  @ManyToOne(() => OrganizationEntity, (entity) => entity.Children)
  @JoinColumn({ name: 'parent_id' })
  Parent!: OrganizationEntity;

  @Column({ name: 'parent_id', type: 'varchar', length: 36, nullable: true })
  ParentId!: string;

  @OneToMany(() => OrganizationEntity, (entity) => entity.Parent)
  Children!: OrganizationEntity[];

  @Column({
    name: 'business_sector_id',
    type: 'varchar',
    length: 36,
    nullable: true,
  })
  BusinessSectorId!: string;

  @Column({ name: 'industry_id', type: 'varchar', length: 36, nullable: true })
  IndustryId!: string;
 
  @Column({
    name: 'working_time_start',
    type: 'timestamp',
    nullable: true,
  })
  public WorkingTimeStart: Date;

  @Column({
    name: 'working_time_end',
    type: 'timestamp',
    nullable: true,
  })
  public WorkingTimeEnd: Date;

  @ManyToOne(() => WorkspaceEntity, (e) => e.Organizations)
  @JoinColumn({ name: 'workspace_id' })
  Workspace: WorkspaceEntity;
 
  @Column({
    name: 'activation_date',
    type: 'datetime',
    nullable: true,
    // default: () => 'CURRENT_TIMESTAMP',
  })
  public ActivationDate: string;

  @OneToMany(() => IAMGroup, (entity) => entity.Organization)
  IAMGroups!: IAMGroup[];

}
