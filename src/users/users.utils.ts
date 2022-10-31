import { SecuredUser, User } from './users.types';
import { isNil as _isNil } from 'lodash';

export class UsersUtils {
  static secureUserData(user: User): SecuredUser {
    if (_isNil(user)) {
      return null;
    }
    return {
      id: user.id,
      username: user.username,
      fullname: user.fullname,
      roles: user.roles,
    };
  }
}
