import { ApiProperty } from '@nestjs/swagger';
import { CustomFieldUpdateModel } from './custom-field.update.model';

export class CustomFieldBulkModel {
  @ApiProperty({ name: 'items', type: [CustomFieldUpdateModel] })
  public items: CustomFieldUpdateModel[];
}
