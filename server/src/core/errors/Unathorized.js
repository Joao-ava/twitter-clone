import AppError from './AppError.js';

class Unathorized extends AppError {
  constructor(message) {
    super(message);
    this.name = 'Unathorized.js';
    this.status = 401;
  }
}

export default Unathorized;
