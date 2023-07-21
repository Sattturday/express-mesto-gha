const handleErrors = (error, req, res, next) => {
  const { statusCode = 500, message = 'На сервере произошла ошибка' } = error;

  res.status(statusCode).send({ message });

  next();
};

module.exports = handleErrors;
