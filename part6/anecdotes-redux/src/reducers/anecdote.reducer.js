const reducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data];
    case 'VOTE':
      const id = action.data.id;
      const anecdoteToVote = state.find(a => a.id === id);
      const updatedAnecdote = { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 };
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : updatedAnecdote
      );
    case 'INIT_ANECDOTES':
      return action.data;
    default:
      return state;
  }
};

export const createAnecdote = data => {
  return {
    type: 'NEW_ANECDOTE',
    data,
  };
};

export const voteUp = id => {
  return {
    type: 'VOTE',
    data: { id },
  };
};

export const initializeAnecdotes = anecdotes => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  };
};

export default reducer;
