require('dotenv/config');
const mongoose = require('mongoose');

const connectionString = process.env.MONGODB_URI;
const connectionOptions = {
  useCreateIndex: true,
  useFindAndModify: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

(() => {
  mongoose
    .connect(connectionString, connectionOptions)
    .then(() => console.log('Db connected.'))
    .catch(err => console.error(err));
})();
