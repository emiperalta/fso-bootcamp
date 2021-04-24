require('dotenv/config');
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

const connectionOptions = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

(() => {
  mongoose
    .connect(MONGODB_URI, connectionOptions)
    .then(() => console.log('Db connected'))
    .catch(error => console.log('error:', error.message));
})();
