import { ApiProperty } from '@nestjs/swagger';
export class EventDeleteModel {
  @ApiProperty({ name: 'ids' })
  ids: string[];
}
