const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
} = require('../controllers/cards');
const { cardCelebrate } = require('../validation/cardValidation');
const { cardIdCelebrate } = require('../validation/idCelebrate');

router.get('/', getCards);
router.post('/', cardCelebrate, createCard);
router.delete('/:cardId', cardIdCelebrate, deleteCard);
router.put('/:cardId/likes', cardIdCelebrate, addLikeCard);
router.delete('/:cardId/likes', cardIdCelebrate, deleteLikeCard);

module.exports = router;
