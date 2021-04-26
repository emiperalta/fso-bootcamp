const { model, Schema } = require('mongoose');

const bookSchema = new Schema({
  title: { type: String, unique: true, required: true, minlength: 2 },
  published: { type: Number, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'Author' },
  genres: [{ type: String }],
});

module.exports = model('Book', bookSchema);
