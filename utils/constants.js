const messages = {
  shared: {
    serverError: 'На сервере произошла ошибка.',
    notFound: 'По указанному пути ничего не найдено.',
    badToken: 'Необходима авторизация.',
  },
  users: {
    notFound: 'Пользователь с указанным _id не найден.',
    badRequest: 'Переданы некорректные данные',
    createBadRequest: 'Переданы некорректные данные при создании пользователя.',
    updateBadRequest: 'Переданы некорректные данные при обновлении профиля.',
    badEmail: 'Пользователь с таким email уже зарегестрирован.',
    badLogin: 'Неверный email или пароль.',
  },
  cards: {
    notFound: 'Карточка с указанным _id не найдена.',
    badRequest: 'Переданы некорректные данные при создании карточки.',
    likeBadRequest: 'Переданы некорректные данные для постановки/снятия лайка.',
    deleteCard: 'Карточка успешно удалена.',
    deleteBadCard: 'Недостаточно прав для удаления этой карточки.',
  },
};

const statuses = {
  created: 201,
  badRequest: 400,
  badLogin: 401,
  conflict: 403,
  notFound: 404,
  badEmail: 409,
  default: 500,
};

const urlRegex = /https?:\/\/(www.)?[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=,]*\.[a-zA-Z]*/;

module.exports = {
  messages,
  statuses,
  urlRegex,
};
