const mongoose = require('mongoose');

const config = require('./utils/config');

const connectionString =
  config.NODE_ENV === 'test' ? config.TEST_MONGODB_URI : config.MONGODB_URI;

const connectionOptions = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

(() => {
  mongoose
    .connect(connectionString, connectionOptions)
    .then(() => console.log(`Db connected.`))
    .catch(err => console.error(err));
})();
