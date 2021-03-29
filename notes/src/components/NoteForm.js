const NoteForm = ({ handleChange, handleSubmit, newNote }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} value={newNote} />
      <button type='submit'>save</button>
    </form>
  );
};

export default NoteForm;
