import Note from './Note';

const NotesList = ({ notesToShow, toggleImportanceOf }) => {
  return (
    <ul>
      {notesToShow.map(note => (
        <Note
          key={note._id}
          note={note}
          toggleImportance={() => toggleImportanceOf(note._id)}
        />
      ))}
    </ul>
  );
};

export default NotesList;
