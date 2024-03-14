import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../entities/base';

@Entity({ name: 'rec_candidates' })
export class CandidateEntity extends BaseEntity {
  @Column({
    name: 'phone',
    type: 'varchar',
    nullable: false,
  })
  Phone: string;

  @Column({
    name: 'email',
    type: 'varchar',
    nullable: false,
  })
  Email: string;

  @Column({
    name: 'profile_link',
    type: 'varchar',
    nullable: true,
  })
  ProfileLink: string;

  @Column({
    name: 'attachments_id',
    type: 'varchar',
    nullable: false,
  })
  AttachmentsId: string;

  @Column({
    name: 'vacancy_id',
    type: 'varchar',
    nullable: false,
  })
  VacancyId: string;

  @Column({
    name: 'password',
    type: 'varchar',
    nullable: false,
  })
  Password: string;
}
