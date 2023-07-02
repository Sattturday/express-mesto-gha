const User = require('../models/user');
const { messages, statuses } = require('../utils/constants');

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res
        .status(statuses.default)
        .send({ message: `${messages.shared.serverError}` });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;

  User.findById(userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res
          .status(statuses.notFound)
          .send({ message: `${messages.users.notFound}` });
      }
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(statuses.badRequest)
          .send({ message: `${messages.users.badRequest}` });
      }

      res
        .status(statuses.default)
        .send({ message: `${messages.shared.serverError}` });
    });
};

const createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res
          .status(statuses.badRequest)
          .send({ message: `${messages.users.createBadRequest}` });
      }

      res
        .status(statuses.default)
        .send({ message: `${messages.shared.serverError}` });
    });
};

const updateUser = (req, res) => {
  const { name, about, avatar } = req.body;
  const id = req.user._id;

  User.findByIdAndUpdate(
    id,
    { name, about, avatar },
    // eslint-disable-next-line comma-dangle
    { new: true, runValidators: true }
  )
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res
          .status(statuses.badRequest)
          .send({ message: `${messages.users.updateBadRequest}` });
      }

      res
        .status(statuses.default)
        .send({ message: `${messages.shared.serverError}` });
    });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
};
