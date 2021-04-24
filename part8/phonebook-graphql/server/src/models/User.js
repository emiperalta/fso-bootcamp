const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, required: true, unique: true, minlength: 3 },
  friend: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Person',
    },
  ],
});

module.exports = model('User', userSchema);
