import { ApiProperty } from '@nestjs/swagger';
export class ContactSkillDeleteModel {
  @ApiProperty({ name: 'ids' })
  ids: string[];
}
