const jsonwebtoken = require('jsonwebtoken');

const handleAuthError = (res) => {
  res.status(401).send({ message: 'Необходима авторизация' });
};

module.exports = (req, res, next) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    return handleAuthError(res);
  }

  let payload;

  try {
    payload = jsonwebtoken.verify(jwt, 'some-secret-key');
  } catch (err) {
    return handleAuthError(res);
  }

  req.user = {
    _id: payload._id,
  };

  next();
};
