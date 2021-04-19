import { useState } from 'react';

export const useField = type => {
  const [value, setValue] = useState('');

  const onChange = e => {
    setValue(e.target.value);
  };

  const onReset = () => {
    setValue('');
  };

  return {
    onChange,
    onReset,
    type,
    value,
  };
};
