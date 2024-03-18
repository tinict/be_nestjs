import { ApiProperty } from '@nestjs/swagger';
import { ContactSkillUpdateModel } from './contact_skills.update.model';

export class ContactSkillBulkModel {
  @ApiProperty({ name: 'items', type: [ContactSkillUpdateModel] })
  public items: ContactSkillUpdateModel[];
}
