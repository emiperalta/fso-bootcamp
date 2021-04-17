import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { initializeAnecdotes } from './reducers/anecdote.reducer';
import { getAll } from './services/anecdotes';

import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getAll().then(anecdotes => dispatch(initializeAnecdotes(anecdotes)));
  }, [dispatch]);

  return (
    <div>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
