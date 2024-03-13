import { ApiProperty } from '@nestjs/swagger';
export class CustomFieldTypeDeleteModel {
  @ApiProperty({ name: 'ids' })
  ids: string[];
}
