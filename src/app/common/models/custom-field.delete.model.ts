import { ApiProperty } from '@nestjs/swagger';
export class CustomFieldDeleteModel {
  @ApiProperty({ name: 'ids' })
  ids: string[];
}
