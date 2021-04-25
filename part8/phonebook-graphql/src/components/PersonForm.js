import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { ALL_PERSONS, CREATE_PERSON } from '../utils/queries';

const PersonForm = ({ setError }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');

  const [createPerson, result] = useMutation(CREATE_PERSON, {
    onError: error => setError(error.graphQLErrors[0].message),
    update: (store, response) => {
      const dataInStore = store.readQuery({ query: ALL_PERSONS });
      const newPerson = response.data.addPerson;
      store.writeQuery({
        query: ALL_PERSONS,
        data: {
          ...dataInStore,
          allPersons: [...dataInStore.allPersons, newPerson],
        },
      });
    },
  });

  const handleSubmit = e => {
    e.preventDefault();
    createPerson({
      variables: { name, street, city, phone: phone.length > 0 ? phone : null },
    });
    setName('');
    setPhone('');
    setStreet('');
    setCity('');
  };

  return (
    <div>
      {result.loading && <p style={{ color: 'green' }}>creating...</p>}
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
