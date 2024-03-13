import { ApiProperty } from '@nestjs/swagger';
export class ResourceCustomFieldValueDeleteModel {
  @ApiProperty({ name: 'ids' })
  ids: string[];
}
