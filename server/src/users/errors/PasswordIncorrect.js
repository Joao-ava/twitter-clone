import Unathorized from '@/core/errors/Unathorized';

class PasswordIncorrect extends Unathorized {
  constructor() {
    super('password_incorrect');
    this.field = 'password';
  }
}

export default PasswordIncorrect;
