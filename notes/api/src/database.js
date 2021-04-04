const mongoose = require('mongoose');

const config = require('./utils/config');
const logger = require('./utils/logger');

const connectionOptions = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

(() => {
  mongoose
    .connect(config.MONGODB_URI, connectionOptions)
    .then(() => logger.info('Db connected.'))
    .catch(err => logger.error(err));
})();
