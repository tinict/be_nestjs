import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../../entities/base';
import { CustomFieldTypeEntity } from './custom-field-type.entity';
import { CustomFieldValueEntity } from './custom-field-value.entity';
import { ResourceCustomFieldValueEntity } from './resource-custom-field-value.entity';
import { ResourceCustomFieldEntity } from './resource-custom-field.entity';

@Entity({ name: 'com_custom_fields' })
export class CustomFieldEntity extends BaseEntity {
  @Column({
    name: 'custom_field_type_id',
    type: 'varchar',
    length: 36,
    nullable: true,
  })
  CustomFieldTypeId!: string;

  @ManyToOne(() => CustomFieldTypeEntity, (e) => e.CustomFields)
  @JoinColumn({ name: 'custom_field_type_id' })
  public CustomFieldType: CustomFieldTypeEntity;

  @OneToMany(() => CustomFieldValueEntity, (e) => e.CustomField)
  CustomFieldValues: CustomFieldValueEntity[];

  @OneToMany(() => ResourceCustomFieldEntity, (e) => e.CustomField)
  ResourceCustomFields: ResourceCustomFieldEntity[];

  @OneToMany(() => ResourceCustomFieldValueEntity, (e) => e.CustomField)
  ResourceCustomFieldValues: ResourceCustomFieldValueEntity[];
}
