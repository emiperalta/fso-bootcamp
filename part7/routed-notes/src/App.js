import { Link, Route, Switch, useRouteMatch } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getAll } from './services/noteService';

import Home from './components/Home';
import NoteList from './components/NoteList';
import Note from './components/Note';
import Users from './components/Users';
import LoginForm from './components/LoginForm';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [user, setUser] = useState(null);
  const match = useRouteMatch('/notes/:id');
  const note = match
    ? notes.find(note => note.id === Number(match.params.id))
    : null;

  useEffect(() => {
    getAll().then(notes => setNotes(notes));
  }, []);

  const login = user => setUser(user);

  const padding = { padding: 5 };

  return (
    <div>
      <div>
        <Link style={padding} to='/'>
          home
        </Link>
        <Link style={padding} to='/notes'>
          notes
        </Link>
        <Link style={padding} to='/users'>
          users
        </Link>
        {user ? (
          <em>{user} logged in</em>
        ) : (
          <Link style={padding} to='/login'>
            log in
          </Link>
        )}
      </div>

      <h1>Notes</h1>

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
