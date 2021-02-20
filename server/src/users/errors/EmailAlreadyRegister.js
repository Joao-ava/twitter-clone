import BadRequest from '@/core/errors/BadRequest';

class EmailAlreadyRegister extends BadRequest {
  constructor() {
    super('email_already_register');
    this.field = 'email';
  }
}

export default EmailAlreadyRegister;
