import { useEffect, useState } from 'react';
import { useApolloClient } from '@apollo/client';

import AuthorList from './components/AuthorList';
import BookList from './components/BookList';
import NewBook from './components/NewBook';
import LoginForm from './components/LoginForm';
import Notification from './components/Notification';

const App = () => {
  const [page, setPage] = useState('authors');
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);

  const client = useApolloClient();

  useEffect(() => {
    const tokenFromLS = localStorage.getItem('loggedUserToken');
    tokenFromLS && setToken(tokenFromLS);
  }, []);

  const notify = message => {
    setError(message);
    setTimeout(() => setError(null), 3000);
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('loggedUserToken');
    client.resetStore();
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <button onClick={() => setPage('login')}>login</button>
        )}
      </div>
      <Notification message={error} />
      <AuthorList show={page === 'authors'} loggedUser={token} />
      <BookList show={page === 'books'} user={token} />
      <NewBook show={page === 'add'} setError={notify} setPage={setPage} />
      <LoginForm
        show={page === 'login'}
        setError={notify}
        setPage={setPage}
        setToken={setToken}
      />
    </div>
  );
};

export default App;
