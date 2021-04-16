const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong>{note.important ? 'important' : 'not important'}</strong>
    </li>
  );
};

export default Note;
