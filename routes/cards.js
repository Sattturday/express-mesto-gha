const router = require('express').Router();

const {
  getCards,
  createCard,
  deleteCard,
  addLikeCard,
  deleteLikeCard,
} = require('../controllers/cards');
const { cardCelebrate } = require('../validation/cardValidation');
const idCelebrate = require('../validation/idCelebrate');

router.get('/', getCards);
router.post('/', cardCelebrate, createCard);
router.delete('/:cardId', idCelebrate, deleteCard);
router.put('/:cardId/likes', idCelebrate, addLikeCard);
router.delete('/:cardId/likes', idCelebrate, deleteLikeCard);

module.exports = router;
