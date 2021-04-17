import { createNew, getAll, voteAnecdote } from '../services/anecdotes';

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data];
    case 'VOTE':
      const id = action.data.id;
      const votedAnecdote = action.data;
      return state.map(anecdote => (anecdote.id !== id ? anecdote : votedAnecdote));
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
};

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await createNew(content);
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    });
  };
};

export const voteUp = (id, votedAnecdote) => {
  return async dispatch => {
    const updatedAnecdote = await voteAnecdote(id, votedAnecdote);
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote,
    });
  };
};

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await getAll();
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    });
  };
};

export default reducer;
