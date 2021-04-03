const { model, Schema } = require('mongoose');

const personSchema = new Schema({
  name: { type: String, minlength: 3, required: true },
  number: { type: Number, minlength: 8, required: true },
});

module.exports = model('Person', personSchema);
