import React, { useEffect, useState } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

import { getAll, addPhone, deletePhone, updateNumber } from './services/phonebook';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    getAll().then(allPersons => setPersons(allPersons));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    const already_saved = persons.find(({ name }) => newName === name);
    if (already_saved) {
      const result = window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      );

      result &&
        updateNumber(already_saved._id, { name: newName, number: newNumber })
          .then(updPerson => {
            const p = persons.find(per => per._id === updPerson._id);
            setPersons([...persons, (p.number = updPerson.number)]);
          })
          .catch(e => {
            setError(
              `Information of ${newName} has already been removed from server`
            );
            setTimeout(() => setError(''), 5000);
          });
    } else {
      addPhone({ name: newName, number: newNumber }).then(newPerson => {
        setPersons([...persons, newPerson]);
        setMessage(`${newName} added`);
        setTimeout(() => setMessage(''), 5000);
      });
      setNewName('');
      setNewNumber('');
    }
  };

  const handleDelete = id => {
    const p = persons.find(p => p._id === id);
    const result = window.confirm(`Delete ${p.name}?`);
    result &&
      deletePhone(id).then(() => {
        const personsCopy = [...persons];
        const personsUpd = personsCopy.filter(p => p._id !== id);
        setPersons(personsUpd);
      });
  };

  const handleChangeName = e => setNewName(e.target.value);
  const handleChangeNumber = e => setNewNumber(e.target.value);
  const handleChangeFilter = e => setNameFilter(e.target.value);

  return (
    <div>
      <h2>Phonebook</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}

      <Filter handleChange={handleChangeFilter} nameFilter={nameFilter} />

      <h2>add new</h2>

      <PersonForm
        handleSubmit={handleSubmit}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      {persons
        .filter(
          ({ name }) =>
            name &&
            name.toLocaleLowerCase().startsWith(nameFilter.toLocaleLowerCase())
        )
        .map(person => (
          <Persons handleDelete={handleDelete} key={person._id} person={person} />
        ))}
    </div>
  );
}

export default App;
