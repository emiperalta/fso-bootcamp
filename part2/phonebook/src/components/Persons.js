import React from 'react';

const Persons = ({ person }) => {
    return (
        <section key={person.name}>
            {person.name} {person.number}
        </section>
    );
};

export default Persons;
