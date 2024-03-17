import { ApiProperty } from '@nestjs/swagger';
import { ChannelUpdateModel } from './channels.update.model';

export class ChannelBulkModel {
  @ApiProperty({ name: 'items', type: [ChannelUpdateModel] })
  public items: ChannelUpdateModel[];
}
