import { ApiProperty } from '@nestjs/swagger';
import { CustomFieldTypeUpdateModel } from './custom-field-type.update.model';

export class CustomFieldTypeBulkModel {
  @ApiProperty({ name: 'items', type: [CustomFieldTypeUpdateModel] })
  public items: CustomFieldTypeUpdateModel[];
}
