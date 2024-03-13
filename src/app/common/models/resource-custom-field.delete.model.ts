import { ApiProperty } from '@nestjs/swagger';
export class ResourceCustomFieldDeleteModel {
  @ApiProperty({ name: 'ids' })
  ids: string[];
}
