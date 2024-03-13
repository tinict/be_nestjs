import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../entities/base';

@Entity({ name: 'rec_contact_skills' })
export class ContactSkillEntity extends BaseEntity {}