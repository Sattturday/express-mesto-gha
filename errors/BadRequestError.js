const { statuses } = require('../utils/constants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statuses.badRequest;
  }
}

module.exports = BadRequestError;
