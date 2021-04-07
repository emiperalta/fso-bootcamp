const bcrypt = require('bcrypt');

const User = require('../models/User');

const getAllUsers = async (req, res) => {
  const users = await User.find({}).populate('notes', { content: 1, date: 1 });
  res.json(users);
};

const addUser = async (req, res) => {
  const { username, name, password } = req.body;

  const alreadyInDB = await User.findOne({ username });
  if (alreadyInDB) return res.status(400).json({ error: 'User already in use.' });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    name,
    password: hashedPassword,
  });

  try {
    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  getAllUsers,
  addUser,
};
