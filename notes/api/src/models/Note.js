const { model, Schema } = require('mongoose');

const noteSchema = new Schema({
  content: String,
  date: Date,
  important: Boolean,
});

module.exports = model('Note', noteSchema);
