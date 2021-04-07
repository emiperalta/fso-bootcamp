const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const config = require('../utils/config');

const login = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  const passwordIsCorrect = !user
    ? false
    : await bcrypt.compare(password, user.password);

  if (!user || !passwordIsCorrect) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, config.SECRET, { expiresIn: 60 * 60 });
  res.status(200).json({ token, username: user.username, name: user.name });
};

module.exports = {
  login,
};
