import { useDispatch } from 'react-redux';

import { createNote } from '../reducers/noteReducer';

import { createNew } from '../services/notes';

const NoteForm = () => {
  const dispatch = useDispatch();

  const addNote = async e => {
    e.preventDefault();
    const content = e.target.note.value;
    e.target.note.value = '';
    const newNote = await createNew(content);
    dispatch(createNote(newNote));
  };

  return (
    <form onSubmit={addNote}>
      <input name='note' />
      <button type='submit'>add</button>
    </form>
  );
};

export default NoteForm;
