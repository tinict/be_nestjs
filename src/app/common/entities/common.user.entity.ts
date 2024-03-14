import { BaseEntity } from '../../../entities/base';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

/**
 * ide_user: Identity organization table
 */
@Entity({ name: 'com_users' })
export class CommonUserEntity extends BaseEntity {
  //#region Properties

  /**
   * User Name
   */
  @Column({ name: 'username', type: 'varchar', nullable: true })
  public UserName: string;

  /**
   * Phone
   */
  @Column({ name: 'phone', type: 'varchar', nullable: true })
  public Phone: string;

  /**
   * Password
   */
  @Column({ name: 'password', type: 'varchar', nullable: true })
  public Password: string;

  /**
   * VerifyCode
   */
  @Column({ name: 'verify_code', type: 'varchar', nullable: true })
  public VerifyCode: string;

  /**
   * Access Id
   */
  @Column({ name: 'access_key', type: 'varchar', nullable: true })
  public AccessKey: string;

  /**
   * Email
   */
  @Column({ name: 'email', type: 'varchar', nullable: true })
  public Email: string;

  @Column({ name: 'address', type: 'varchar', nullable: true })
  public Address: string;

  /**
   * Language
   */
  @Column({ name: 'language', type: 'varchar', nullable: true })
  public Language: string;

  /**
   * Timezone
   */
  @Column({ name: 'timezone', type: 'varchar', nullable: true })
  public Timezone: string;

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
   * Birthday
   */
  @Column({
    name: 'birthday',
    type: 'timestamp',
    nullable: true,
  })
  public Birthday: Date;

  /**
   * Gender
   */
  @Column({
    name: 'gender',
    type: 'tinyint',
    nullable: true,
  })
  public Gender: number;

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

  /**
   * User Type
   */
  @Column({ name: 'user_type', type: 'tinyint', nullable: false, default: 0 })
  public UserType: number;

  //#endregion

  //#region References

  // @ManyToMany(() => UserGroup, group => group.Users)
  // @JoinTable()
  // UserGroups!: UserGroup[];

  /**
   * Organization
   */

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

  @Column({ name: 'is_public_phone', type: 'tinyint' })
  public IsPublicPhone: number;
 

  @Column({
    name: 'super_admin',
    type: 'tinyint',
    nullable: true,
  })
  public SuperAdmin: number;
}
