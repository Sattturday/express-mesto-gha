const { celebrate, Joi } = require('celebrate');

const idCelebrate = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

module.exports = idCelebrate;
