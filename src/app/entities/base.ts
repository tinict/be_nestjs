import { Column, PrimaryGeneratedColumn } from 'typeorm';

/**
 * Base system Entity
 * - name,
 * - description,
 * - delete_flag,
 * - created_by,
 * - created_date,
 * - last_updated_by,
 * - last_update_date
 */
export abstract class BaseEntity {
  /**
   * Id
   */
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  Id: string;

  /**
   * Name
   */
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: true })
  public Name: string;

  /**
   * Description
   */
  @Column({ name: 'description', type: 'longtext', nullable: true })
  public Description: string;

  @Column({ name: 'display_order', type: 'decimal', nullable: true })
  public DisplayOrder: number;

  @Column({ name: 'color', type: 'varchar', length: 255, nullable: true })
  public Color: string;

  /**
   * Created By
   */
  @Column({ name: 'created_by', type: 'char', length: 64, nullable: true })
  public CreatedBy: string;

  @Column({ name: 'short_code', type: 'char', length: 64, nullable: true })
  public ShortCode: string;

  @Column({ name: 'code', type: 'char', length: 64, nullable: true })
  public Code: string;

  @Column({
    name: 'organization_id',
    type: 'varchar',
    length: 36,
    nullable: true,
  })
  OrganizationId!: string;

  @Column({ name: 'workspace_id', type: 'varchar', length: 36, nullable: true })
  WorkspaceId!: string;

  @Column({ name: 'parent_id', type: 'varchar', length: 36, nullable: true })
  ParentId!: string;

  @Column({ name: 'thumbnail', type: 'text', nullable: true })
  Thumbnail!: string;

  /**
   * Created Date
   */
  @Column({
    name: 'created_date',
    type: 'timestamp',
    nullable: true,
    // default: () => 'CURRENT_TIMESTAMP',
  })
  public CreatedDate: string;

  /**
   * Last Updated By
   */
  @Column({ name: 'last_updated_by', type: 'char', length: 64, nullable: true })
  public LastUpdatedBy: string;

  /**
   * Update Date
   */
  @Column({
    name: 'last_update_date',
    type: 'timestamp',
    nullable: true,
    default: () => 'CURRENT_TIMESTAMP',
    // onUpdate: 'CURRENT_TIMESTAMP',
  })
  public LastUpdateDate: string;

  /**
   * Deleted By
   */
  @Column({ name: 'deleted_by', type: 'char', length: 64, nullable: true })
  public DeletedBy: string;

  /**
   * Deleted Date
   */
  @Column({ name: 'deleted_date', type: 'timestamp', nullable: true })
  public DeleteDate: string;
}
