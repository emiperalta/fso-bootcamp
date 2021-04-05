const Note = require('../models/Note');

module.exports.getAllNotes = async (req, res) => {
  const notes = await Note.find({});
  res.json(notes);
};

module.exports.getNote = async (req, res, next) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (note) res.json(note);
    else res.status(404).end();
  } catch (err) {
    next(err);
  }
};

module.exports.addNote = async (req, res, next) => {
  const { content } = req.body;

  if (!content) return res.status(400).json({ error: 'Content must not be empty.' });

  const newNote = new Note({
    content,
    date: new Date(),
    important: Math.random() < 0.5,
  });

  try {
    const savedNote = await newNote.save();
    res.status(201).json(savedNote);
  } catch (err) {
    next(err);
  }
};

module.exports.updateNote = async (req, res, next) => {
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

module.exports.deleteNote = async (req, res, next) => {
  const { id } = req.params;
  try {
    await Note.findByIdAndRemove(id);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
