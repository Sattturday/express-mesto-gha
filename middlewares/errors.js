const { messages, statuses } = require('../utils/constants');

const handleErrors = (error, req, res, next) => {
  const { statusCode = 500, message = 'На сервере произошла ошибка' } = error;

  if (error.code === 11000) {
    res.status(statuses.badEmail).send({ message: messages.users.badEmail });
    return;
  }

  res.status(statusCode).send({ message });

  next();
};

module.exports = handleErrors;
