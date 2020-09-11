import AppError from './AppError';

class BadRequest extends AppError {
  constructor(message) {
    super(message);
    this.name = 'BadRequest';
    this.status = 400;
  }
}

export default BadRequest;
