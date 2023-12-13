const BaseError = require("./base");

class NotFoundError extends BaseError {
  constructor(message) {
    super(message, 404);
  }
}

module.exports = NotFoundError;
