import { useEffect, useState } from 'react';

export const useField = type => {
  const [value, setValue] = useState('');

  const onChange = event => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

export const useCountry = name => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    name &&
      fetch(`https://restcountries.eu/rest/v2/name/${name}?fullText=true
      `)
        .then(res => res.json())
        .then(data => setCountry(data));
  }, [name]);

  return country;
};
