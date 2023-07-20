const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
} = require('../controllers/cards');
const { cardCelebrate } = require('../validation/cardValidation');

router.get('/', getCards);
router.post('/', cardCelebrate, createCard);
router.delete('/:cardId', deleteCard);
router.put('/:cardId/likes', addLikeCard);
router.delete('/:cardId/likes', deleteLikeCard);

module.exports = router;
