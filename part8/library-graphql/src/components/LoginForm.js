import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';

import { LOGIN } from '../utils/queries';

const LoginForm = ({ setError, setPage, setToken, show }) => {
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
      setPage('authors');
    }
  }, [result.data]); //eslint-disable-line

  const handleSubmit = e => {
    e.preventDefault();
    login({ variables: { username, password } });
    setUsername('');
    setPassword('');
  };

  if (!show) return null;

  return (
    <div>
      <h2>login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>username</label>
          <input onChange={e => setUsername(e.target.value)} value={username} />
        </div>
        <div>
          <label>password</label>
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
