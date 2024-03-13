import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../entities/base';
import { CustomFieldEntity } from './custom-field.entity';
import { ResourceCustomFieldValueEntity } from './resource-custom-field-value.entity';

@Entity({ name: 'com_custom_field_values' })
export class CustomFieldValueEntity extends BaseEntity {
  @Column({
    name: 'custom_field_id',
    type: 'varchar',
    length: 36,
    nullable: true,
  })
  CustomFieldId!: string;

  @ManyToOne(() => CustomFieldEntity, (e) => e.CustomFieldValues)
  @JoinColumn({ name: 'custom_field_id' })
  public CustomField: CustomFieldEntity;

  @OneToMany(() => ResourceCustomFieldValueEntity, (e) => e.CustomFieldValue)
  ResourceCustomFieldValues: ResourceCustomFieldValueEntity[];
}
