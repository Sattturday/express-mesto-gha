const router = require('express').Router();

const {
  createUser,
  getUsers,
  getUser,
  updateUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/:userId', getUser);
router.post('/', createUser);
router.patch('/me', updateUser);
router.patch('/me/avatar', updateUser);

module.exports = router;
