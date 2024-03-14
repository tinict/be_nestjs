import { ApiProperty } from '@nestjs/swagger';
import { CustomFieldValueUpdateModel } from './custom-field-value.update.model';

export class CustomFieldValueBulkModel {
  @ApiProperty({ name: 'items', type: [CustomFieldValueUpdateModel] })
  public items: CustomFieldValueUpdateModel[];
}
