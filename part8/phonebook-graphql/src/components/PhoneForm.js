import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';

import { EDIT_NUMBER } from '../utils/queries';

const PhoneForm = ({ setError }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [changeNumber, result] = useMutation(EDIT_NUMBER);

  useEffect(() => {
    if (result.data && result.data.editNumber === null) setError('person not found');
  }, [result.data]); //eslint-disable-line

  const handleSubmit = e => {
    e.preventDefault();
    changeNumber({ variables: { name, phone } });
    setName('');
    setPhone('');
  };

  return (
    <div>
      <h2>change number</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name <input onChange={e => setName(e.target.value)} />
        </div>
        <div>
          phone <input onChange={e => setPhone(e.target.value)} />
        </div>
        <button>change number</button>
      </form>
    </div>
  );
};

export default PhoneForm;
