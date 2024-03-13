import { Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../entities/base';
import { CustomFieldEntity } from './custom-field.entity';

@Entity({ name: 'com_custom_field_types' })
export class CustomFieldTypeEntity extends BaseEntity {
  @OneToMany(() => CustomFieldEntity, (e) => e.CustomFieldType)
  CustomFields: CustomFieldEntity[];
}
