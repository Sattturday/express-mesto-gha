const BadRequestError = require('../errors/BadRequestError');
const { ConflictError } = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const Card = require('../models/card');
const { messages, statuses } = require('../utils/constants');

const getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((card) => res.status(statuses.created).send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(messages.cards.badRequest));
        return;
      }
      next(err);
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;
  const userId = req.user._id;

  Card.findById(cardId)
    .orFail(new NotFoundError(messages.cards.notFound))
    .then((card) => {
      if (userId !== String(card.owner)) {
        throw new ConflictError(messages.cards.deleteBadCard);
      }
      Card.findByIdAndRemove(cardId)
        .orFail(new NotFoundError(messages.cards.notFound))
        .then(() => res.send({ message: `${messages.cards.deleteCard}` }));
    })
    .catch(next);
};

const addLikeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError(messages.cards.notFound))
    .then((card) => res.send(card))
    .catch(next);
};

const deleteLikeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndUpdate(
    cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new NotFoundError(messages.cards.notFound))
    .then((card) => res.send(card))
    .catch(next);
};

module.exports = {
  getCards,
  createCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
};
