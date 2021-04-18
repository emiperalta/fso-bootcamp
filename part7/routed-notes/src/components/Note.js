const Note = ({ note }) => {
  return (
    <div>
      <div>{note.content}</div>
      <div>
        <strong>{note.important ? 'important' : ''}</strong>
      </div>
    </div>
  );
};

export default Note;
