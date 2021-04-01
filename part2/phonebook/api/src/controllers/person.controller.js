const Person = require('../models/Person');

module.exports.getPersons = (req, res) => {
  Person.find({})
    .then(persons => res.json(persons))
    .catch(err => console.error(err));
};

module.exports.getPerson = (req, res, next) => {
  const { id } = req.params;

  Person.findById(id)
    .then(person => {
      if (person) res.json(person);
      else res.status(404).end();
    })
    .catch(err => next(err));
};

module.exports.getInfo = (req, res) => {
  const date = new Date();
  Person.find({})
    .then(persons =>
      res.send(`
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${date}</p>	
      `)
    )
    .catch(err => console.error(err));
};

module.exports.addPerson = (req, res) => {
  const { name, number } = req.body;

  if (!name || !number)
    return res.status(400).json({ error: 'Name and number must not be empty.' });

  Person.findOne({ name })
    .then(person => {
      if (person) return res.status(400).json({ error: 'Name must be unique.' });

      const newPerson = new Person({
        name,
        number,
      });

      newPerson
        .save()
        .then(savedPerson => res.status(201).json(savedPerson))
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
};

module.exports.updatePerson = (req, res, next) => {
  const { id } = req.params;
  const { name, number } = req.body;

  const person = {
    name,
    number,
  };

  Person.findByIdAndUpdate(id, person, { new: true })
    .then(updatedPerson => res.json(updatedPerson))
    .catch(err => next(err));
};

module.exports.deletePerson = (req, res, next) => {
  const { id } = req.params;

  Person.findByIdAndRemove(id)
    .then(() => res.status(204).end())
    .catch(err => next(err));
};
