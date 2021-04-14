const jwt = require('jsonwebtoken');

const Note = require('../models/Note');
const User = require('../models/User');
const config = require('../utils/config');

const getTokenFrom = req => {
  const authorization = req.get('authorization');
  if (authorization && authorization.startsWith('Bearer '))
    return authorization.substring(7);
  return null;
};

const getAllNotes = async (req, res) => {
  const notes = await Note.find({}).populate('user', { username: 1, name: 1 });
  res.json(notes);
};

const getNote = async (req, res, next) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (note) res.json(note);
    else res.status(404).end();
  } catch (err) {
    next(err);
  }
};

const addNote = async (req, res, next) => {
  const { content } = req.body;
  try {
    const token = getTokenFrom(req);
    const decodedToken = jwt.verify(token, config.SECRET);

    if (!content)
      return res.status(400).json({ error: 'Content must not be empty.' });

    if (!token || !decodedToken.id) {
      return res.status(401).json({ error: 'Token missing or invalid.' });
    }

    const userFromDB = await User.findById(decodedToken.id);

    const newNote = new Note({
      content,
      date: new Date(),
      user: userFromDB._id,
    });

    const savedNote = await newNote.save();
    userFromDB.notes = [...userFromDB.notes, savedNote._id];
    await userFromDB.save();
    res.status(201).json(savedNote);
  } catch (err) {
    next(err);
  }
};

const updateNote = async (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  const note = {
    content: body.content,
    important: body.important,
  };

  try {
    const updatedNote = await Note.findByIdAndUpdate(id, note, { new: true });
    res.json(updatedNote);
  } catch (err) {
    next(err);
  }
};

const deleteNote = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Note.findByIdAndRemove(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllNotes,
  getNote,
  addNote,
  updateNote,
  deleteNote,
};
