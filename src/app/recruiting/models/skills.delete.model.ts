import { ApiProperty } from '@nestjs/swagger';
export class SkillDeleteModel {
  @ApiProperty({ name: 'ids' })
  ids: string[];
}
