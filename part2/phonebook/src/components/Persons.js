import React from 'react';

const Persons = ({ handleDelete, person }) => {
  return (
    <section key={person.name}>
      {person.name} {person.number}{' '}
      <button onClick={() => handleDelete(person.id)}>delete</button>
    </section>
  );
};

export default Persons;
