import { ApiProperty } from '@nestjs/swagger';
import { UserUpdateModel } from './user.update.model';

export class UserBulkModel {
  @ApiProperty({ name: 'items', type: [UserUpdateModel] })
  public items: UserUpdateModel[];
}
