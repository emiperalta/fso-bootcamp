require('dotenv/config');
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

const connectionOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
};

(() => {
  mongoose
    .connect(MONGODB_URI, connectionOptions)
    .then(() => console.log('Db connected'))
    .catch(err => console.error(err));
})();
