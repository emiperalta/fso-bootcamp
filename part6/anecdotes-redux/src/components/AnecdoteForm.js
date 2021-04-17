import { useDispatch } from 'react-redux';

import { createAnecdote } from '../reducers/anecdote.reducer';
import { createNew } from '../services/anecdotes';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    const newNote = await createNew(e.target.content.value);
    dispatch(createAnecdote(newNote));
    e.target.content.value = '';
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name='content' />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
