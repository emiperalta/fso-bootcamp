import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { GET_BOOKS } from '../utils/queries';

const Books = props => {
  const [books, setBooks] = useState([]);

  const { data, loading } = useQuery(GET_BOOKS);

  useEffect(() => data && setBooks(data.allBooks), [data]);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      {loading ? (
        <div>loading...</div>
      ) : (
        <div>
          <h2>books</h2>

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
                  <td>{a.author}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Books;
