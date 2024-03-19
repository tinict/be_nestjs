import { ApiProperty } from '@nestjs/swagger';
import { SkillUpdateModel } from './skills.update.model';

export class SkillBulkModel {
  @ApiProperty({ name: 'items', type: [SkillUpdateModel] })
  public items: SkillUpdateModel[];
}
