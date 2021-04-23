import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { ALL_PERSONS } from './utils/queries';

import Notification from './components/Notification';
import PersonList from './components/PersonList';
import PersonForm from './components/PersonForm';
import PhoneForm from './components/PhoneForm';

const App = () => {
  const [error, setError] = useState(null);

  const { data, loading } = useQuery(ALL_PERSONS);

  const notify = message => {
    setError(message);
    setTimeout(() => setError(null), 4000);
  };

  if (loading) return <div>loading...</div>;

  return (
    <div>
      <Notification message={error} />
      <PersonList persons={data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  );
};

export default App;
