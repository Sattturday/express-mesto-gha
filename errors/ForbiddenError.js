const { statuses } = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statuses.forbidden;
  }
}

module.exports = { ForbiddenError };
