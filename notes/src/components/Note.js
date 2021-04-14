const Note = ({ note, toggleImportance }) => {
  const label = note.important ? 'make not important' : 'make important';
  return (
    <li className='note'>
      <span>
        {note.content}
        <button onClick={toggleImportance}>{label}</button>
      </span>
    </li>
  );
};

export default Note;
