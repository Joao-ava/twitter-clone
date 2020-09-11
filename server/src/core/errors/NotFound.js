import AppError from './AppError';

class NotFound extends AppError {
  constructor(message) {
    super(message);
    this.name = 'NotFound';
    this.status = 404;
  }
}

export default NotFound;
