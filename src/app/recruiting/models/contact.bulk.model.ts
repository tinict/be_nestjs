import { ApiProperty } from '@nestjs/swagger';
import { ContactUpdateModel } from './contact.update.model';

export class ContactBulkModel {
  @ApiProperty({ name: 'items', type: [ContactUpdateModel] })
  public items: ContactUpdateModel[];
}
