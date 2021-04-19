import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getAll } from './services/noteService';

import Home from './components/Home';
import Notification from './components/Notification';
import Menu from './components/Menu';
import NoteList from './components/NoteList';
import Note from './components/Note';
import Users from './components/Users';
import LoginForm from './components/LoginForm';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);

  const match = useRouteMatch('/notes/:id');
  const note = match
    ? notes.find(note => note.id === Number(match.params.id))
    : null;

  useEffect(() => {
    getAll().then(notes => setNotes(notes));
  }, []);

  const login = user => {
    setUser(user);
    setMessage(`welcome ${user}`);
    setTimeout(() => setMessage(null), 5000);
  };

  return (
    <div className='container'>
      <Notification message={message} />

      <Menu user={user} />

      <h1>Notes app</h1>

      <Switch>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/notes'>
          <NoteList notes={notes} />
        </Route>
        <Route path='/notes/:id'>
          <Note note={note} />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/login'>
          <LoginForm handleLogin={login} />
        </Route>
      </Switch>

      <div>
        <em>Note app, emidev.</em>
      </div>
    </div>
  );
};

export default App;
