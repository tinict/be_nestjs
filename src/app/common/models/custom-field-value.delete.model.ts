import { ApiProperty } from '@nestjs/swagger';
export class CustomFieldValueDeleteModel {
  @ApiProperty({ name: 'ids' })
  ids: string[];
}
