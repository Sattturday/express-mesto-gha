const { celebrate, Joi } = require('celebrate');
const { urlRegex } = require('../utils/constants');

const cardCelebrate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(urlRegex),
  }),
});

module.exports = {
  cardCelebrate,
};
