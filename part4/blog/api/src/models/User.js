const { model, Schema } = require('mongoose');

const userSchema = new Schema({
  username: { type: String, minlength: 3, required: true },
  name: String,
  password: { type: String, required: true },
  blogs: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Blog',
    },
  ],
});

userSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    delete returnedObject.password;
  },
});

module.exports = model('User', userSchema);
