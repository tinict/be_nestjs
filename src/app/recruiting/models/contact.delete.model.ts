import { ApiProperty } from '@nestjs/swagger';
export class ContactDeleteModel {
  @ApiProperty({ name: 'ids' })
  ids: string[];
}
