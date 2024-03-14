import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../entities/base';
import { CustomFieldValueEntity } from './custom-field-value.entity';
import { CustomFieldEntity } from './custom-field.entity';

@Entity({ name: 'com_resource_custom_field_values' })
export class ResourceCustomFieldValueEntity extends BaseEntity {
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

  @ManyToOne(() => CustomFieldEntity, (e) => e.ResourceCustomFieldValues)
  @JoinColumn({ name: 'custom_field_id' })
  public CustomField: CustomFieldEntity;

  @Column({
    name: 'custom_field_value_id',
    type: 'varchar',
    length: 36,
    nullable: true,
  })
  CustomFieldValueId!: string;

  @ManyToOne(() => CustomFieldValueEntity, (e) => e.ResourceCustomFieldValues)
  @JoinColumn({ name: 'custom_field_value_id' })
  public CustomFieldValue: CustomFieldValueEntity;
}
