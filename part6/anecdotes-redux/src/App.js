import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { initializeAnecdotes } from './reducers/anecdote.reducer';

import AnecdoteList from './components/AnecdoteList';
import AnecdoteForm from './components/AnecdoteForm';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;
