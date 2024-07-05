import { ApiProperty } from '@nestjs/swagger';
export class UserDeleteModel {
  @ApiProperty({ name: 'ids' })
  ids: string[];
}