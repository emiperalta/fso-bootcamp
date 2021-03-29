const persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
];

module.exports.getPersons = (req, res) => {
  res.json(persons);
};

module.exports.getPerson = (req, res) => {
  const id = Number(req.params.id);
  const personFinded = persons.find(person => person.id === id);

  if (personFinded) res.json(personFinded);
  else res.status(404).json({ error: 'Person not founded.' });
};

module.exports.getInfo = (req, res) => {
  const date = new Date();
  res.send(`
		<p>Phonebook has info for ${persons.length} people</p>
		<p>${date}</p>	
	`);
};

module.exports.addPerson = (req, res) => {
  const { name, number } = req.body;
  const personFinded = persons.find(person => person.name === name);

  if (personFinded) return res.status(400).json({ error: 'Name must be unique.' });
  if (name === '' || number === '')
    return res.status(400).json({ error: 'Name or number must not be empty.' });

  const newPerson = {
    name,
    number,
    id: Math.floor(Math.random() * 1000),
  };
  persons.push(newPerson);

  res.json(persons);
};

module.exports.deletePerson = (req, res) => {
  const id = Number(req.params.id);
  const personFinded = persons.find(person => person.id === id);

  if (personFinded) {
    const deleted = persons.filter(person => person.id !== personFinded.id);
    res.json(deleted);
  } else res.status(404).json({ error: 'Person not founded.' });
};
