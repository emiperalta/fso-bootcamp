const { model, Schema } = require('mongoose');

const authorSchema = new Schema({
  name: { type: String, unique: true, required: true, minlength: 2 },
  born: { type: Number },
});

module.exports = model('Author', authorSchema);
