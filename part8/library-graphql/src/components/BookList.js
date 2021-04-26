import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import Filters from './Filter';

import { GET_BOOKS } from '../utils/queries';

const Books = ({ show, user }) => {
  const [books, setBooks] = useState([]);
  const [filter, setFilter] = useState('');

  const { data, loading } = useQuery(GET_BOOKS);

  useEffect(() => {
    data && setBooks(data.allBooks);
  }, [data]);

  if (!show) {
    return null;
  }

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div>
          <h2>books</h2>
          {filter && (
            <span>
              in genre <strong>{filter}</strong>
            </span>
          )}
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>author</th>
                <th>published</th>
              </tr>
              {books.map(a => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {user && <Filters setBooks={setBooks} setFilter={setFilter} />}
        </div>
      )}
    </div>
  );
};

export default Books;
