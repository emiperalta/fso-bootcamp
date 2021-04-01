const Note = require('../models/Note');

module.exports.getAllNotes = (req, res) => {
  Note.find({})
    .then(result => res.json(result))
    .catch(err => console.error(err));
};

module.exports.getNote = (req, res, next) => {
  const { id } = req.params;
  Note.findById(id)
    .then(note => {
      if (note) res.json(note);
      else res.status(404).end();
    })
    .catch(err => next(err));
};

module.exports.addNote = (req, res, next) => {
  const { content } = req.body;

  if (!content) return res.status(400).json({ error: 'Content must not be empty.' });

  const newNote = new Note({
    content,
    date: new Date(),
    important: Math.random() < 0.5,
  });

  newNote
    .save()
    .then(savedNote => res.status(201).json(savedNote))
    .catch(err => next(err));
};

module.exports.updateNote = (req, res, next) => {
  const { id } = req.params;
  const { body } = req;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(id, note, { new: true })
    .then(updatedNote => res.json(updatedNote))
    .catch(err => next(err));
};

module.exports.deleteNote = (req, res, next) => {
  const { id } = req.params;

  Note.findByIdAndRemove(id)
    .then(() => res.status(204).end())
    .catch(err => next(err));
};
