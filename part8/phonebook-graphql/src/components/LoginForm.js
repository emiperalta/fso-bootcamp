import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';

import { LOGIN } from '../utils/queries';

const LoginForm = ({ setError, setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [login, result] = useMutation(LOGIN, {
    onError: error => setError(error.graphQLErrors[0].message),
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('loggedUserToken', token);
    }
  }, [result.data]); //eslint-disable-line

  const handleSubmit = e => {
    e.preventDefault();
    login({ variables: { username, password } });
    setUsername('');
    setPassword('');
  };

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username{' '}
          <input onChange={e => setUsername(e.target.value)} value={username} />
        </div>
        <div>
          password{' '}
          <input
            onChange={e => setPassword(e.target.value)}
            type='password'
            value={password}
          />
        </div>
        <button>login</button>
      </form>
    </div>
  );
};

export default LoginForm;
