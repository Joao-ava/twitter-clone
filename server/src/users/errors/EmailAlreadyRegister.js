import BadRequest from '#app/core/errors/BadRequest.js';

class EmailAlreadyRegister extends BadRequest {
  constructor() {
    super('email_already_register');
    this.field = 'email';
  }
}

export default EmailAlreadyRegister;
