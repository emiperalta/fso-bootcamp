const baseUrl = 'http://localhost:3001/notes';

export const getAll = async () => {
  const response = await fetch(baseUrl);
  return response.json();
};

export const createNew = async content => {
  const object = { content, important: false };
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(object),
  });
  return response.json();
};
