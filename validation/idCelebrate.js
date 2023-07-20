const { celebrate, Joi } = require('celebrate');

const cardIdCelebrate = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }),
});

const userIdCelebrate = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = { cardIdCelebrate, userIdCelebrate };
