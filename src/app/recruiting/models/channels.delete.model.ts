import { ApiProperty } from '@nestjs/swagger';
export class ChannelDeleteModel {
  @ApiProperty({ name: 'ids' })
  ids: string[];
}
