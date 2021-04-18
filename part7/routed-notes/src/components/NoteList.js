import { Link } from 'react-router-dom';

const NoteList = ({ notes }) => {
  return (
    <div>
      <ul>
        {notes.map(note => {
          return (
            <li key={note.id}>
              <Link to={`/notes/${note.id}`}>{note.content}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NoteList;
