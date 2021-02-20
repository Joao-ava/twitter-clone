import NotFound from '@/core/errors/NotFound';

class UserNotFound extends NotFound {
  constructor() {
    super('user_not_found');
    this.field = 'email';
  }
}

export default UserNotFound;
