const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { messages, statuses } = require('../utils/constants');
const UnauthorizedError = require('../errors/UnauthorizedError');

const createUser = async (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    });
    res.status(statuses.created).send(user);
  } catch (err) {
    next(err);
  }
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .orFail(new UnauthorizedError(messages.users.badLogin))
    .then((user) => {
      bcrypt
        .compare(password, user.password)

        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(messages.users.badLogin);
          }

          const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
            expiresIn: '7d',
          });
          res.cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: true,
          });

          res.send({ _id: user._id });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  createUser,
  login,
};
