const baseURL = 'http://localhost:3001/persons';

export const getAll = () => {
  return fetch(baseURL).then(res => res.json());
};

export const addPhone = ({ name, number }) => {
  return fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, number }),
  }).then(res => res.json());
};

export const deletePhone = id => {
  return fetch(`${baseURL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  }).then(res => res.json());
};

export const updateNumber = (id, { name, number }) => {
  return fetch(`${baseURL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, number }),
  }).then(res => res.json());
};
