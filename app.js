/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes');
const handleErrors = require('./middlewares/errors');

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

app.use(routes);
app.use(errors());
app.use(handleErrors);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
