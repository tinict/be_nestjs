import { ApiProperty } from '@nestjs/swagger';
export class CandidateSkillDeleteModel {
  @ApiProperty({ name: 'ids' })
  ids: string[];
}
