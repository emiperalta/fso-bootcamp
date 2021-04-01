const { model, Schema } = require('mongoose');

const personSchema = new Schema({
  name: String,
  number: Number,
});

module.exports = model('Person', personSchema);
