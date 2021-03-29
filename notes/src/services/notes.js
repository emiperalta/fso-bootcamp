const baseURL = 'http://localhost:3001/notes';

export const getAll = () => {
  return fetch(baseURL).then(res => res.json());
};

export const addNote = ({ content, date, important }) => {
  return fetch(baseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, date, important }),
  }).then(res => res.json());
};

export const changeNote = (id, updatedNote) => {
  return fetch(`${baseURL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedNote),
  }).then(res => res.json());
};
