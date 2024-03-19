import { ApiProperty } from '@nestjs/swagger';
import { EventUpdateModel } from './events.update.model';

export class EventBulkModel {
  @ApiProperty({ name: 'items', type: [EventUpdateModel] })
  public items: EventUpdateModel[];
}
