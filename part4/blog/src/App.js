import { useEffect, useState } from 'react';

import LoginForm from './components/LoginForm';
import BlogList from './components/BlogList';
import BlogForm from './components/BlogForm';
import { addBlog, getBlogs, setToken } from './services/blogService';
import { login } from './services/userService';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
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

  const handleCreate = async e => {
    e.preventDefault();
    try {
      const newBlog = await addBlog({ title, author, url });
      setMessage(`a new blog "${newBlog.title} by ${author}" added`);
      setTimeout(() => setMessage(''), 4000);
      setBlogs([...blogs, newBlog]);
    } catch (err) {
      setError(`${err}`);
      setTimeout(() => setError(''), 4000);
    }
  };

  const handleUsernameChange = e => setUsername(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);
  const handleTitleChange = e => setTitle(e.target.value);
  const handleAuthorChange = e => setAuthor(e.target.value);
  const handleUrlChange = e => setUrl(e.target.value);

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
          <BlogForm
            author={author}
            handleAuthorChange={handleAuthorChange}
            handleCreate={handleCreate}
            handleTitleChange={handleTitleChange}
            handleUrlChange={handleUrlChange}
            title={title}
            url={url}
          />
          <BlogList blogs={blogs} />
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
