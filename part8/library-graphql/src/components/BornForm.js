import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import Select from 'react-select';

import { EDIT_BIRTHYEAR, GET_AUTHORS } from '../utils/queries';

const BornForm = ({ authors, setError }) => {
  const [name, setName] = useState(null);
  const [born, setBorn] = useState(0);

  const [editAuthor, result] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: GET_AUTHORS }],
  });

  const options = authors.map(author => {
    return {
      value: author.name,
      label: author.name,
    };
  });

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      setError('author not found');
      setTimeout(() => setError(''), 4000);
    }
  }, [result.data]);

  const handleSubmit = e => {
    e.preventDefault();
    editAuthor({ variables: { name: name.value, newYear: born } });
    setName(null);
    setBorn(0);
  };

  return (
    <div>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <Select defaultValue={name} onChange={setName} options={options} />
        <div>
          born{' '}
          <input
            type='number'
            value={born}
            onChange={e => setBorn(Number(e.target.value))}
          />
        </div>
        <button>update author</button>
      </form>
    </div>
  );
};

export default BornForm;
