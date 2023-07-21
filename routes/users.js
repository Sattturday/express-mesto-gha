const router = require('express').Router();

const {
  getUsers,
  getCurrentUser,
  getUserById,
  updateProfile,
  updateAvatar,
} = require('../controllers/users');
const { userIdCelebrate } = require('../validation/idCelebrate');

const {
  profileUpdateCelebrate,
  avatarUpdateCelebrate,
} = require('../validation/userValidation');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', userIdCelebrate, getUserById);
router.patch('/me', profileUpdateCelebrate, updateProfile);
router.patch('/me/avatar', avatarUpdateCelebrate, updateAvatar);

module.exports = router;
