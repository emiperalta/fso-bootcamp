const apiURL = process.env.REACT_APP_APIURL;

let token = null;

export const setToken = newToken => {
  token = newToken;
};

export const getAll = () => {
  return fetch(`${apiURL}/notes`).then(res => res.json());
};

export const addNote = ({ content, important }) => {
  return fetch(`${apiURL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ content, important }),
  }).then(res => res.json());
};

export const changeNote = (id, updatedNote) => {
  return fetch(`${apiURL}/notes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedNote),
  }).then(res => res.json());
};
