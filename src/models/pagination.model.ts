import { ApiProperty } from '@nestjs/swagger';

export class PaginationModel {
  @ApiProperty({ name: 'offset', required: false })
  offset: number;

  @ApiProperty({ name: 'limit', required: false })
  limit: number;
}
