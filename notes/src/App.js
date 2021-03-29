import { useEffect, useState } from 'react';

import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';
import Notification from './components/Notification';

import { addNote, changeNote, getAll } from './services/notes';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getAll().then(allNotes => setNotes(allNotes));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();

    addNote({
      content: newNote,
      date: new Date(),
      important: false,
    }).then(noteAdded => setNotes([...notes, noteAdded]));

    setNewNote('');
  };

  const handleChange = e => setNewNote(e.target.value);

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    changeNote(id, changedNote)
      .then(result => {
        setNotes(notes.map(note => (note.id !== id ? note : result)));
      })
      .catch(e => {
        setError(`Note ${note.content} was already removed from server`);
        setTimeout(() => setError(null), 5000);
        setNotes(notes.filter(n => n.id !== id));
      });
  };

  const notesToShow = showAll ? notes : notes.filter(note => note.important);

  return (
    <div>
      <h1>Notes</h1>

      <Notification message={error} />

      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>

      <NotesList notesToShow={notesToShow} toggleImportanceOf={toggleImportanceOf} />

      <NoteForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        newNote={newNote}
      />
    </div>
  );
};

export default App;
