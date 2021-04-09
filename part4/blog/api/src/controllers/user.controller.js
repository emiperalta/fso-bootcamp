const bcrypt = require('bcrypt');

const User = require('../models/User');

const getAllUsers = async (req, res) => {
  const users = await User.find({}).populate('blogs', {
    author: 1,
    title: 1,
    url: 1,
  });
  res.json(users);
};

const addUser = async (req, res, next) => {
  const { username, name, password } = req.body;

  if (password.length < 3) {
    return res
      .status(400)
      .json({ error: 'Password must be at least 3 characters long.' });
  }

  const alreadyInDB = await User.findOne({ username });
  if (alreadyInDB) return res.status(400).json({ error: 'User already in use.' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    name,
    password: hashedPassword,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
};

module.exports = { getAllUsers, addUser };
