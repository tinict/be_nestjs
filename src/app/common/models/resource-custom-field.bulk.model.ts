import { ApiProperty } from '@nestjs/swagger';
import { ResourceCustomFieldUpdateModel } from './resource-custom-field.update.model';

export class ResourceCustomFieldBulkModel {
  @ApiProperty({ name: 'items', type: [ResourceCustomFieldUpdateModel] })
  public items: ResourceCustomFieldUpdateModel[];
}
