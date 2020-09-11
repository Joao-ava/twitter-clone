import AppError from './AppError';

class Unathorized extends AppError {
  constructor(message) {
    super(message);
    this.name = 'Unathorized';
    this.status = 401;
  }
}

export default Unathorized;
