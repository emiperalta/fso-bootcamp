let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
];

module.exports.getAllNotes = (req, res) => res.status(200).json(notes);

module.exports.getNote = (req, res) => {
  const id = Number(req.params.id);

  const note = notes.find(n => n.id === id);
  note ? res.status(200).json(note) : res.status(404).end();
};

module.exports.addNote = (req, res) => {
  const { content } = req.body;

  if (!content) return res.status(400).json({ error: 'Content must not be empty.' });

  const newNote = {
    id: Math.floor(Math.random() * 1000),
    content,
    date: new Date(),
    important: Math.random() < 0.5,
  };

  notes.push(newNote);
  res.status(200).json(newNote);
};

module.exports.deleteNote = (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter(note => note.id !== id);
  res.status(204).end();
};
