import React from 'react';

const Persons = ({ handleDelete, person }) => {
  return (
    <section>
      {person.name} {person.number}{' '}
      <button onClick={() => handleDelete(person._id)}>delete</button>
    </section>
  );
};

export default Persons;
