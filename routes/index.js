const router = require('express').Router();
const userRouter = require('./users');
const cardRouter = require('./cards');
const { auth } = require('../middlewares/auth');
const { createUser, login, logout } = require('../controllers/auth');
const { userCelebrate } = require('../validation/userValidation');
const NotFoundError = require('../errors/NotFoundError');
const { messages } = require('../utils/constants');

router.get('/signout', logout);
router.post('/signup', userCelebrate, createUser);
router.post('/signin', userCelebrate, login);

router.use(auth);
router.use('/users', userRouter);
router.use('/cards', cardRouter);

router.use((req, res, next) => {
  next(new NotFoundError(messages.shared.notFound));
});

module.exports = router;
