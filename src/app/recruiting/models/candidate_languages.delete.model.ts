import { ApiProperty } from '@nestjs/swagger';
export class CandidateLanguageDeleteModel {
  @ApiProperty({ name: 'ids' })
  ids: string[];
}
