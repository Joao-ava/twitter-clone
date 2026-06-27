import Unathorized from '#app/core/errors/Unathorized.js';

class PasswordIncorrect extends Unathorized {
  constructor() {
    super('password_incorrect');
    this.field = 'password';
  }
}

export default PasswordIncorrect;
