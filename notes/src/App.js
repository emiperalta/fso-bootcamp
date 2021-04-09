import { useEffect, useState } from 'react';

import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';

import { addNote, changeNote, getAll, setToken } from './services/noteService';
import { login } from './services/userService';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [error, setError] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    getAll().then(allNotes => setNotes(allNotes));
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      setToken(user.token);
    }
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    newNote &&
      addNote({
        content: newNote,
        date: new Date(),
        important: Math.random() < 0.5,
      }).then(noteAdded => setNotes([...notes, noteAdded]));

    setNewNote('');
  };

  const handleLogin = async e => {
    e.preventDefault();
    try {
      const user = await login({ username, password });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setToken(user.token);
      setUser(user);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = e => setNewNote(e.target.value);
  const handleUsernameChange = e => setUsername(e.target.value);
  const handlePasswordChange = e => setPassword(e.target.value);

  const toggleImportanceOf = id => {
    const note = notes.find(n => n._id === id);
    const changedNote = { ...note, important: !note.important };

    changeNote(id, changedNote)
      .then(result => {
        setNotes(notes.map(note => (note._id !== id ? note : result)));
      })
      .catch(e => {
        setError(`Note '${note.content}' was already removed from server`);
        setTimeout(() => setError(null), 5000);
        setNotes(notes.filter(n => n.id !== id));
      });
  };

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={error} />

      {user ? (
        <NoteForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          newNote={newNote}
        />
      ) : (
        <LoginForm
          handleLogin={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          username={username}
          password={password}
        />
      )}

      <section>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </section>

      <NotesList notesToShow={notesToShow} toggleImportanceOf={toggleImportanceOf} />
    </div>
  );
};

export default App;
