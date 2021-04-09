const { REACT_APP_APIKEY } = process.env;

let token = null;

export const setToken = newToken => {
  token = newToken;
};

export const getAll = () => {
  return fetch(`${REACT_APP_APIKEY}/notes`).then(res => res.json());
};

export const addNote = ({ content, date, important }) => {
  return fetch(`${REACT_APP_APIKEY}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content, date, important }),
  }).then(res => res.json());
};

export const changeNote = (id, updatedNote) => {
  return fetch(`${REACT_APP_APIKEY}/notes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedNote),
  }).then(res => res.json());
};
