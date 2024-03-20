import { ApiProperty } from '@nestjs/swagger';
import { PositionUpdateModel } from './positions.update.model';

export class PositionBulkModel {
  @ApiProperty({ name: 'items', type: [PositionUpdateModel] })
  public items: PositionUpdateModel[];
}
