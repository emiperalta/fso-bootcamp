const apiURL = process.env.REACT_APP_APIURL;

export const login = async credentials => {
  const response = await fetch(`${apiURL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    const { error } = await response.json();
    throw Error(error);
  }
  return response.json();
};
