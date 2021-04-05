const mongoose = require('mongoose');

const config = require('./utils/config');

const connectionOptions = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

(() => {
  mongoose
    .connect(config.MONGODB_URI, connectionOptions)
    .then(() => console.log(`Db connected.`))
    .catch(err => console.error(err));
})();
