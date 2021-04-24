const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, unique: true, required: true, minlength: 3 },
  favoriteGenre: { type: String, required: true },
});

module.exports = model('User', userSchema);
