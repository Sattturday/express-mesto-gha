const Card = require('../models/card');
const { messages, statuses } = require('../utils/constants');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res
        .status(statuses.default)
        .send({ message: `${messages.shared.serverError}` });
    });
};

const createCard = (req, res) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        return res
          .status(statuses.badRequest)
          .send({ message: `${messages.cards.badRequest}` });
      }

      res
        .status(statuses.default)
        .send({ message: `${messages.shared.serverError}` });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then(() => res.send({ message: `${messages.cards.deleteCard}` }))
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(statuses.notFound)
          .send({ message: `${messages.cards.notFound}` });
      }

      res
        .status(statuses.default)
        .send({ message: `${messages.shared.serverError}` });
    });
};

const addLikeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    // eslint-disable-next-line comma-dangle
    { new: true }
  )
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(statuses.badRequest)
          .send({ message: `${messages.cards.likeBadRequest}` });
      }

      res
        .status(statuses.default)
        .send({ message: `${messages.shared.serverError}` });
    });
};

const deleteLikeCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    // eslint-disable-next-line comma-dangle
    { new: true }
  )
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.name === 'CastError') {
        return res
          .status(statuses.badRequest)
          .send({ message: `${messages.cards.likeBadRequest}` });
      }

      res
        .status(statuses.default)
        .send({ message: `${messages.shared.serverError}` });
    });
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
};
