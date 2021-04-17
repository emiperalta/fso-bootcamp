import { useDispatch } from 'react-redux';

import { createNote } from '../reducers/noteReducer';

const NoteForm = () => {
  const dispatch = useDispatch();

  const addNote = async e => {
    e.preventDefault();
    dispatch(createNote(e.target.note.value));
    e.target.note.value = '';
  };

  return (
    <form onSubmit={addNote}>
      <input name='note' />
      <button type='submit'>add</button>
    </form>
  );
};

export default NoteForm;
