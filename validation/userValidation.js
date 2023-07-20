const { celebrate, Joi } = require('celebrate');
const { urlRegex } = require('../utils/constants');

const userCelebrate = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(6),
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(urlRegex),
    })
    .unknown(true),
});

const profileUpdateCelebrate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
});

const avatarUpdateCelebrate = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().regex(urlRegex),
  }),
});

module.exports = {
  userCelebrate,
  profileUpdateCelebrate,
  avatarUpdateCelebrate,
};
