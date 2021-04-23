import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ALL_PERSONS, CREATE_PERSON } from '../utils/queries';

const PersonForm = ({ setError }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');

  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: error => setError(error.graphQLErrors[0].message),
  });

  const handleSubmit = e => {
    e.preventDefault();
    createPerson({ variables: { name, phone, street, city } });
    setName('');
    setPhone('');
    setStreet('');
    setCity('');
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name <input onChange={e => setName(e.target.value)} value={name} />
        </div>
        <div>
          phone <input onChange={e => setPhone(e.target.value)} value={phone} />
        </div>
        <div>
          street <input onChange={e => setStreet(e.target.value)} value={street} />
        </div>
        <div>
          city <input onChange={e => setCity(e.target.value)} value={city} />
        </div>
        <button>add</button>
      </form>
    </div>
  );
};

export default PersonForm;
