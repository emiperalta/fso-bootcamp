import { useEffect, useState } from 'react';
import { useApolloClient, useQuery, useSubscription } from '@apollo/client';

import { ALL_PERSONS, PERSON_ADDED } from './utils/queries';

import Notification from './components/Notification';
import PersonList from './components/PersonList';
import PersonForm from './components/PersonForm';
import PhoneForm from './components/PhoneForm';
import LoginForm from './components/LoginForm';

const App = () => {
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);

  const { data, loading } = useQuery(ALL_PERSONS);
  const client = useApolloClient();
  useSubscription(PERSON_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedPerson = subscriptionData.data.personAdded;
      notify(`${addedPerson.name} was added`);
    },
  });

  useEffect(() => {
    const token = localStorage.getItem('loggedUserToken');
    if (token) {
      setToken(token);
    }
  }, []);

  const notify = message => {
    setError(message);
    setTimeout(() => setError(null), 4000);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('loggedUserToken');
    client.resetStore();
  };

  if (loading) return <div>loading...</div>;

  if (!token) {
    return (
      <div>
        <Notification message={error} />
        <LoginForm setError={notify} setToken={setToken} />
      </div>
    );
  }

  return (
    <div>
      <button onClick={logout}>logout</button>
      <Notification message={error} />
      <PersonList persons={data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  );
};

export default App;
