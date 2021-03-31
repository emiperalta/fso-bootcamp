const { REACT_APP_APIKEY } = process.env;

export const getAll = () => {
  return fetch(`${REACT_APP_APIKEY}`).then(res => res.json());
};

export const addNote = ({ content, date, important }) => {
  return fetch(`${REACT_APP_APIKEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content, date, important }),
  }).then(res => res.json());
};

export const changeNote = (id, updatedNote) => {
  return fetch(`${REACT_APP_APIKEY}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedNote),
  }).then(res => res.json());
};
