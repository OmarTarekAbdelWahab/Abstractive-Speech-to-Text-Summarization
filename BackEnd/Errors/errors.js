class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  class BadRequestError extends AppError {
    constructor(message = "Bad Request") {
      super(message, 400);
    }
  }
  
  class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized") {
      super(message, 401);
    }
  }
  
  class ForbiddenError extends AppError {
    constructor(message = "Forbidden") {
      super(message, 403);
    }
  }
  
  export { AppError, BadRequestError, UnauthorizedError, ForbiddenError };  