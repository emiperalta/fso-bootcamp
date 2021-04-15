const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const config = require('../utils/config');

const login = async (req, res) => {
  const { username, password } = req.body;

  const userInDB = await User.findOne({ username });
  const passwordIsCorrect = !userInDB
    ? false
    : await bcrypt.compare(password, userInDB.password);

  if (!userInDB || !passwordIsCorrect) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const userForToken = {
    username: userInDB.username,
    id: userInDB._id,
  };

  const token = jwt.sign(userForToken, config.SECRET, { expiresIn: 60 * 60 });
  res
    .status(200)
    .json({
      id: userInDB._id,
      name: userInDB.name,
      token,
      username: userInDB.username,
    });
};

module.exports = {
  login,
};
