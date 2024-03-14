import { ApiProperty } from '@nestjs/swagger';
import { ResourceCustomFieldValueUpdateModel } from './resource-custom-field-value.update.model';

export class ResourceCustomFieldValueBulkModel {
  @ApiProperty({ name: 'items', type: [ResourceCustomFieldValueUpdateModel] })
  public items: ResourceCustomFieldValueUpdateModel[];
}
