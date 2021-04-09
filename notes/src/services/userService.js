const { REACT_APP_APIKEY } = process.env;

export const login = async credentials => {
  const response = await fetch(`${REACT_APP_APIKEY}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  return response.json();
};
