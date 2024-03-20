import { ApiProperty } from '@nestjs/swagger';
export class PositionDeleteModel {
  @ApiProperty({ name: 'ids' })
  ids: string[];
}
