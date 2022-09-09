const express = require('express');
const createError = require('http-errors');
const morgan = require('morgan');
require('dotenv').config();
const cors = require('cors')
const os = require('os')
const { mongoConnect } = require('./config/db.config')
mongoConnect()

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors())

app.get('/', async (req, res, next) => {
  res.send({ message:`reverse proxying container: ${os.hostname}` });
});

app.use('/api', require('./routes/api.route'));
app.use('/auth-api', require('./routes/authApi.route'));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));