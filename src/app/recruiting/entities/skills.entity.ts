import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../entities/base';

@Entity({ name: 'rec_skills' })
export class SkillEntity extends BaseEntity {}