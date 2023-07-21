const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { messages, statuses } = require('../utils/constants');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { ConflictError } = require('../errors/ConflictError');
const BadRequestError = require('../errors/BadRequestError');

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((createdUser) => {
      const { _id } = createdUser;
      res.status(statuses.created).send({
        _id,
        name,
        about,
        avatar,
        email,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(messages.users.badEmail));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
        return;
      }
      next(err);
    });
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

const logout = (req, res) => {
  res.clearCookie('jwt').send({ message: messages.shared.clearCookie });
};

module.exports = {
  createUser,
  login,
  logout,
};
