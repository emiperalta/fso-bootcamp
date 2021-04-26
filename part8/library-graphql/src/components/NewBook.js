import { useState } from 'react';
import { useMutation } from '@apollo/client';

import { CREATE_BOOK, GET_AUTHORS, GET_BOOKS } from '../utils/queries';

const NewBook = ({ setError, setPage, show }) => {
  const [title, setTitle] = useState('');
  const [author, setAuhtor] = useState('');
  const [published, setPublished] = useState(0);
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [addBook, { loading }] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: GET_AUTHORS }, { query: GET_BOOKS }],
    onError: error => setError(error.graphQLErrors[0].message),
    onCompleted: () => setPage('books'),
  });

  if (!show) {
    return null;
  }

  const submit = async event => {
    event.preventDefault();
    addBook({ variables: { title, author, published, genres } });
    setTitle('');
    setPublished(0);
    setAuhtor('');
    setGenres([]);
    setGenre('');
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre('');
  };

  return (
    <div>
      <h2>create new book</h2>
      <form onSubmit={submit}>
        <div>
          title
          <input value={title} onChange={({ target }) => setTitle(target.value)} />
        </div>
        <div>
          author
          <input value={author} onChange={({ target }) => setAuhtor(target.value)} />
        </div>
        <div>
          published
          <input
            onChange={({ target }) => setPublished(Number(target.value))}
            type='number'
            value={published}
          />
        </div>
        <div>
          <input value={genre} onChange={({ target }) => setGenre(target.value)} />
          <button onClick={addGenre} type='button'>
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type='submit'>create book</button>
      </form>
      {loading && <div style={{ color: 'green' }}>creating...</div>}
    </div>
  );
};

export default NewBook;
