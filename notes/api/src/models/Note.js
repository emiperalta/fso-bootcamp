const { model, Schema } = require('mongoose');

const noteSchema = new Schema({
  content: { type: String, minlength: 5, required: true },
  date: { type: Date, required: true },
  important: Boolean,
});

module.exports = model('Note', noteSchema);
