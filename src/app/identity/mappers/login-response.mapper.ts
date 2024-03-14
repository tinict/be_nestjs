import * as _ from 'lodash';
import { UserMapper } from './user.mapper';

export class LoginResponseMapper {
  static toLogin = (result) => ({
    access_token: _.get(result, 'access_token'),
    refresh_token: _.get(result, 'refresh_token'),
    expired_in: _.get(result, 'expired_in'),
    user: UserMapper.toUser(_.get(result, 'user')),
  });
}
