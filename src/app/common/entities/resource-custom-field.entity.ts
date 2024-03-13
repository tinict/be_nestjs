import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../entities/base';
import { CustomFieldEntity } from './custom-field.entity';

@Entity({ name: 'com_resource_custom_fields' })
export class ResourceCustomFieldEntity extends BaseEntity {
  @Column({
    name: 'resource_id',
    type: 'varchar',
    length: 36,
    nullable: true,
  })
  ResourceId!: string;

  @Column({
    name: 'custom_field_id',
    type: 'varchar',
    length: 36,
    nullable: true,
  })
  CustomFieldId!: string;

  @ManyToOne(() => CustomFieldEntity, (e) => e.ResourceCustomFields)
  @JoinColumn({ name: 'custom_field_id' })
  public CustomField: CustomFieldEntity;
}
