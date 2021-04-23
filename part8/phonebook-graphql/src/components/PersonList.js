import { useEffect, useState } from 'react';
import { useLazyQuery } from '@apollo/client';

import { FIND_PERSON } from '../utils/queries';

const PersonList = ({ persons }) => {
  const [person, setPerson] = useState(null);
  const [getPerson, result] = useLazyQuery(FIND_PERSON);

  useEffect(() => {
    if (result.data) {
      setPerson(result.data.findPerson);
    }
  }, [result]);

  const showPerson = name => {
    getPerson({ variables: { nameToSearch: name } });
  };

  return (
    <div>
      {person ? (
        <div>
          <h2>{person.name}</h2>
          <div>
            {person.address.street} {person.address.city}
          </div>
          <div>{person.phone}</div>
          <button onClick={() => setPerson(null)}>close</button>
        </div>
      ) : (
        <div>
          <h2>Persons</h2>
          {persons.map(p => (
            <div key={p.name}>
              {p.name} {p.phone}
              <button onClick={() => showPerson(p.name)}>show address</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PersonList;
