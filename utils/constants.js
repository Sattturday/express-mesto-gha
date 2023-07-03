const messages = {
  shared: {
    serverError: 'На сервере произошла ошибка.',
    notFound: 'По указанному пути ничего не найдено.',
  },
  users: {
    notFound: 'Пользователь с указанным _id не найден.',
    badRequest: 'Переданы некорректные данные.',
    createBadRequest: 'Переданы некорректные данные при создании пользователя.',
    updateBadRequest: 'Переданы некорректные данные при обновлении профиля.',
  },
  cards: {
    notFound: 'Карточка с указанным _id не найдена.',
    badRequest: 'Переданы некорректные данные при создании карточки.',
    likeBadRequest: 'Переданы некорректные данные для постановки/снятия лайка.',
    deleteCard: 'Карточка успешно удалена.',
    deleteBadCard: 'Переданы некорректные данные.',
  },
};

const statuses = {
  created: 201,
  badRequest: 400,
  notFound: 404,
  default: 500,
};

module.exports = {
  messages,
  statuses,
};
