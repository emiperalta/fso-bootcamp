import { useDispatch, useSelector } from 'react-redux';

import { toggleImportanceOf } from '../reducers/noteReducer';

import Note from './Note';

const NoteList = () => {
  const dispatch = useDispatch();
  const notes = useSelector(state => state);

  return (
    <ul>
      {notes.map(note => (
        <Note
          key={note.id}
          note={note}
          handleClick={() => dispatch(toggleImportanceOf(note.id))}
        />
      ))}
    </ul>
  );
};

export default NoteList;
