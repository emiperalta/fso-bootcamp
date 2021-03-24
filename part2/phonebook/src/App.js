import React, { useState } from 'react';

import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';

function App() {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
    ]);
    const [newName, setNewName] = useState('');
    const [newNumber, setNewNumber] = useState('');
    const [nameFilter, setNameFilter] = useState('');

    const handleSubmit = e => {
        e.preventDefault();

        const already_saved = persons.find(({ name }) => newName === name);
        if (already_saved) return alert(`${newName} is already added to phonebook`);

        setPersons([...persons, { name: newName, number: newNumber }]);
    };

    const handleChangeName = e => setNewName(e.target.value);
    const handleChangeNumber = e => setNewNumber(e.target.value);
    const handleChangeFilter = e => setNameFilter(e.target.value);

    return (
        <div>
            <h2>Phonebook</h2>

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
                .filter(({ name }) =>
                    name
                        .toLocaleLowerCase()
                        .startsWith(nameFilter.toLocaleLowerCase())
                )
                .map(person => (
                    <Persons key={person.name} person={person} />
                ))}
        </div>
    );
}

export default App;
