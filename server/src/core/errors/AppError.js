class AppError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ServerError';
    this.status = 500;
  }
}

export default AppError;
