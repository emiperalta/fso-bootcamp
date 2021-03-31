const { REACT_APP_APIKEY } = process.env;

export const getAll = () => {
  return fetch(REACT_APP_APIKEY).then(res => res.json());
};

export const addPhone = ({ name, number }) => {
  return fetch(REACT_APP_APIKEY, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, number }),
  }).then(res => res.json());
};

export const deletePhone = id => {
  return fetch(`${REACT_APP_APIKEY}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const updateNumber = (id, { name, number }) => {
  return fetch(`${REACT_APP_APIKEY}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, number }),
  }).then(res => res.json());
};
