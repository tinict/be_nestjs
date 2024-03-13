import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../entities/base';

@Entity({ name: 'rec_contacts' })
export class ContactEntity extends BaseEntity {}