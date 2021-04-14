import { useRef, useState } from 'react';

import Toggable from './Toggable';

const NoteForm = ({ createNote }) => {
  const [newNote, setNewNote] = useState('');
  const noteFormRef = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    newNote &&
      createNote({
        content: newNote,
        important: false,
      });
    newNote && noteFormRef.current.toggleVisibility();
    setNewNote('');
  };

  const handleChange = e => setNewNote(e.target.value);

  return (
    <Toggable buttonLabel='new note' ref={noteFormRef}>
      <div className='formDiv'>
        <form onSubmit={handleSubmit}>
          <input onChange={handleChange} value={newNote} />
          <button type='submit'>save</button>
        </form>
      </div>
    </Toggable>
  );
};

export default NoteForm;
