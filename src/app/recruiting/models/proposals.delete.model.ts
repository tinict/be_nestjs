import { ApiProperty } from '@nestjs/swagger';
export class ProposalDeleteModel {
  @ApiProperty({ name: 'ids' })
  ids: string[];
}
