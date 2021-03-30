let persons = [
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

module.exports.getPersons = (req, res) => res.status(200).json(persons);

module.exports.getPerson = (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);

  if (person) return res.status(200).json(person);
  else res.status(404).end();
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
  const person = persons.find(p => p.name === name);

  if (person) return res.status(400).json({ error: 'Name must be unique.' });
  if (!name || !number)
    return res.status(400).json({ error: 'Name or number must not be empty.' });

  const newPerson = {
    name,
    number,
    id: Math.floor(Math.random() * 1000),
  };

  persons = [...persons, newPerson];
  res.status(201).json(newPerson);
};

module.exports.deletePerson = (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find(p => p.id === id);

  if (person) {
    persons = persons.filter(p => p.id !== person.id);
    return res.status(204).end();
  } else return res.status(404).json({ error: 'Person not found.' });
};
