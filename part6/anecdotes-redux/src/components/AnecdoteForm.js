import { useDispatch } from 'react-redux';

import { createAnecdote } from '../reducers/anecdote.reducer';

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleSubmit = async e => {
    e.preventDefault();
    dispatch(createAnecdote(e.target.content.value));
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
