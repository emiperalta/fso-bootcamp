import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import BornForm from './BornForm';

import { GET_AUTHORS } from '../utils/queries';

const Authors = props => {
  const [authors, setAuthors] = useState([]);
  const [error, setError] = useState('');

  const { data, loading } = useQuery(GET_AUTHORS);

  useEffect(() => data && setAuthors(data.allAuthors), [data]);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {loading ? (
        <div>loading...</div>
      ) : (
        <div>
          <h2>authors</h2>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>born</th>
                <th>books</th>
              </tr>
              {authors.map(a => (
                <tr key={a.name}>
                  <td>{a.name}</td>
                  <td>{a.born}</td>
                  <td>{a.bookCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <BornForm setError={setError} authors={authors} />
        </div>
      )}
    </div>
  );
};

export default Authors;
