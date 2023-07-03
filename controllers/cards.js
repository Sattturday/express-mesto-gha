const Card = require('../models/card');
const { messages, statuses } = require('../utils/constants');

const getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
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
    .then((card) => res.status(statuses.created).send(card))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res
          .status(statuses.badRequest)
          .send({ message: `${messages.cards.badRequest} ${error.message}` });
        return;
      }

      res
        .status(statuses.default)
        .send({ message: `${messages.shared.serverError}` });
    });
};

const deleteCard = (req, res) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .orFail(new Error('NotValidId'))
    .then(() => res.send({ message: `${messages.cards.deleteCard}` }))
    .catch((error) => {
      if (error.message === 'NotValidId') {
        res
          .status(statuses.notFound)
          .send({ message: `${messages.cards.notFound}` });
        return;
      }
      if (error.name === 'CastError') {
        res
          .status(statuses.badRequest)
          .send({ message: `${messages.cards.deleteBadCard}` });
        return;
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
    { new: true }
  )
    .orFail(new Error('NotValidId'))
    .then((card) => res.send(card))
    .catch((error) => {
      if (error.message === 'NotValidId') {
        res
          .status(statuses.notFound)
          .send({ message: `${messages.cards.notFound}` });
        return;
      }
      if (error.name === 'CastError') {
        res
          .status(statuses.badRequest)
          .send({ message: `${messages.cards.likeBadRequest}` });
        return;
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
    { new: true }
  )
    .orFail(new Error('NotValidId'))

    .then((card) => res.send(card))
    .catch((error) => {
      if (error.message === 'NotValidId') {
        res
          .status(statuses.notFound)
          .send({ message: `${messages.cards.notFound}` });
        return;
      }
      if (error.name === 'CastError') {
        res
          .status(statuses.badRequest)
          .send({ message: `${messages.cards.likeBadRequest}` });
        return;
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
