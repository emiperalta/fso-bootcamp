import { useState } from 'react';

const NoteForm = ({ createNote, handleLogout }) => {
  const [newNote, setNewNote] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    newNote &&
      createNote({
        content: newNote,
        important: Math.random() < 0.5,
      });
    setNewNote('');
  };

  const handleChange = e => setNewNote(e.target.value);

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} value={newNote} />
      <button type='submit'>save</button>
    </form>
  );
};

export default NoteForm;
