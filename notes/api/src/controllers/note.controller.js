const Note = require('../models/Note');
const User = require('../models/User');

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
  const { content, userId } = req.body;

  if (!content) return res.status(400).json({ error: 'Content must not be empty.' });

  const userFromDB = await User.findById(userId);

  const newNote = new Note({
    content,
    date: new Date(),
    important: Math.random() < 0.5,
    user: userFromDB._id,
  });

  try {
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
