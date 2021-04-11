const apiURL = process.env.REACT_APP_APIURL;

let token = null;

export const setToken = newToken => {
  token = newToken;
};

export const getBlogs = async () => {
  const response = await fetch(`${apiURL}/blogs`);
  return response.json();
};

export const addBlog = async data => {
  const response = await fetch(`${apiURL}/blogs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const { error } = await response.json();
    throw Error(error);
  }
  return response.json();
};

export const likeBlog = async (id, likedBlog) => {
  const response = await fetch(`${apiURL}/blogs/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(likedBlog),
  });
  if (!response.ok) {
    const { error } = await response.json();
    throw Error(error);
  }
  return response.json();
};

export const deleteBlog = async id => {
  const response = await fetch(`${apiURL}/blogs/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const { error } = await response.json();
    throw Error(error);
  }
};
