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
    .orFail(new Error('NotValidId'))
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.message === 'NotValidId') {
        res
          .status(statuses.notFound)
          .send({ message: `${messages.users.notFound}` });
        return;
      }
      if (error.name === 'CastError') {
        res
          .status(statuses.badRequest)
          .send({ message: `${messages.users.badRequest}` });
        return;
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
      res.status(statuses.created).send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(statuses.badRequest).send({
          message: `${messages.users.createBadRequest} ${error.message}`,
        });
        return;
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
    { new: true, runValidators: true }
  )
    .then((user) => {
      res.send(user);
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(statuses.badRequest).send({
          message: `${messages.users.updateBadRequest} ${error.message}`,
        });
        return;
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
