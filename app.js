/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { messages, statuses } = require('./utils/constants');

const { PORT = 3000 } = process.env;
const DATABASE_URL = 'mongodb://127.0.0.1:27017/mestodb';
const app = express();

mongoose
  .connect(DATABASE_URL)
  .then(() => {
    console.log(`База данных подключена ${DATABASE_URL}`);
  })
  .catch((err) => {
    console.log('Ошибка подключения к базе данных');
    console.error(err);
  });

app.use((req, res, next) => {
  req.user = {
    _id: '64a144012b7641beeaac1ce7',
  };

  next();
});

app.use(bodyParser.json());
app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use((req, res) => {
  res
    .status(statuses.notFound)
    .send({ message: `${messages.shared.notFound}` });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
