const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: String,
  name: String,
  password: String,
  notes: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Note',
    },
  ],
});

userSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    delete returnedObject.password;
  },
});

module.exports = model('User', userSchema);
