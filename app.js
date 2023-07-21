/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { createUser, login } = require('./controllers/auth');
const { auth } = require('./middlewares/auth');
const handleErrors = require('./middlewares/errors');
const { userCelebrate } = require('./validation/userValidation');
const NotFoundError = require('./errors/NotFoundError');
const { messages } = require('./utils/constants');

const { PORT = 3000, DATABASE_URL = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log(`База данных подключена ${DATABASE_URL}`);
  })
  .catch((err) => {
    console.log(`Ошибка подключения к базе данных: ${err}`);
  });

app.use(helmet());
app.use(bodyParser.json());
app.use(cookieParser());

app.post('/signup', userCelebrate, createUser);
app.post('/signin', userCelebrate, login);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);

app.use((req, res, next) => {
  next(new NotFoundError(messages.shared.notFound));
});

app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
