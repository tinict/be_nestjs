import { ApiProperty } from '@nestjs/swagger';
import { ProposalUpdateModel } from './proposals.update.model';

export class ProposalBulkModel {
  @ApiProperty({ name: 'items', type: [ProposalUpdateModel] })
  public items: ProposalUpdateModel[];
}
