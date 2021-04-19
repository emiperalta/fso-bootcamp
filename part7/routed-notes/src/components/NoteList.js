import { Link } from 'react-router-dom';
import { Table } from 'react-bootstrap';

const NoteList = ({ notes }) => {
  return (
    <div>
      <h3>Notes</h3>
      <Table striped>
        <tbody>
          {notes.map(note => (
            <tr key={note.id}>
              <td>
                <Link to={`/notes/${note.id}`}>{note.content}</Link>
              </td>
              <td>{note.user}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default NoteList;
