import { useState, useEffect } from 'react';

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

export const useResource = baseUrl => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetch(baseUrl)
      .then(res => res.json())
      .then(data => setResources(data));
  }, [baseUrl]);

  const create = resource => {
    fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(resource),
    })
      .then(res => res.json())
      .then(data => setResources([...resources, data]));
  };

  const service = {
    create,
  };

  return [resources, service];
};
