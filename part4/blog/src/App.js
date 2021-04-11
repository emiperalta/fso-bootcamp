import { useEffect, useState } from 'react';

import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import {
  addBlog,
  deleteBlog,
  getBlogs,
  likeBlog,
  setToken,
} from './services/blogService';
import { login } from './services/userService';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const blogs = await getBlogs();
        setBlogs(blogs);
      } catch (err) {
        console.error(err);
      }
    };
    getAllBlogs();
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const user = await login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      setToken(user.token);
      setUsername('');
      setPassword('');
    } catch (err) {
      setError(`${err}`);
      setTimeout(() => setError(''), 4000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  const createBlog = async blogObj => {
    try {
      const newBlog = await addBlog(blogObj);
      setMessage(`a new blog "${newBlog.title} by ${newBlog.author}" added`);
      setTimeout(() => setMessage(''), 4000);
      setBlogs([...blogs, newBlog]);
    } catch (err) {
      setError(`${err}`);
      setTimeout(() => setError(''), 4000);
    }
  };

  const handleLike = async id => {
    try {
      let blog = blogs.find(b => b._id === id);
      const likedBlog = { ...blog, likes: blog.likes + 1 };
      const updatedBlog = await likeBlog(id, likedBlog);
      setBlogs(blogs.map(blog => (blog._id !== id ? blog : updatedBlog)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async id => {
    const blogToDelete = blogs.find(b => b._id === id);
    const result = window.confirm(
      `Remove blog "${blogToDelete.title} by ${blogToDelete.author}"?`
    );
    if (result) {
      try {
        await deleteBlog(id);
        setBlogs(blogs.filter(blog => blog._id !== id));
      } catch (err) {
        setError(`${err}`);
        setTimeout(() => setError(''), 4000);
      }
    }
  };

  const handleUsernameChange = e => setUsername(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

  return (
    <div>
      {user ? <h2>blogs</h2> : <h2>log in to application</h2>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {user ? (
        <>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <h2>create new</h2>
          <BlogForm createBlog={createBlog} />
          <BlogList
            blogs={blogs}
            handleDelete={handleDelete}
            handleLike={handleLike}
            user={user}
          />
        </>
      ) : (
        <LoginForm
          handleLogin={handleLogin}
          handlePasswordChange={handlePasswordChange}
          handleUsernameChange={handleUsernameChange}
          password={password}
          username={username}
        />
      )}
    </div>
  );
};

export default App;
