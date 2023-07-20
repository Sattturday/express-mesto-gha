const { statuses } = require('../utils/constants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statuses.badLogin;
  }
}

module.exports = UnauthorizedError;
