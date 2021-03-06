import { useSelector, useDispatch } from 'react-redux';

import { voteUp } from '../reducers/anecdote.reducer';
import { showNotification } from '../reducers/notification.reducer';

import Notification from './Notification';
import Filter from './Filter';

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(state => state.anecdotes);
  const filter = useSelector(state => state.filter);

  const vote = id => {
    let anecdote = anecdotes.find(a => a.id === id);
    anecdote = { ...anecdote, votes: anecdote.votes + 1 };
    dispatch(voteUp(id, anecdote));
    dispatch(showNotification(`you voted "${anecdote.content}"`, 5));
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .filter(anecdote => anecdote.content.toLowerCase().includes(filter))
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AnecdoteList;
