import NotFound from '#app/core/errors/NotFound.js';

class UserNotFound extends NotFound {
  constructor() {
    super('user_not_found');
    this.field = 'email';
  }
}

export default UserNotFound;
