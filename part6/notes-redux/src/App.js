import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { initializeNotes } from './reducers/noteReducer';

import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import VisibilityFilter from './components/VisibilityFilter';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch]);

  return (
    <div>
      <NoteForm />
      <VisibilityFilter />
      <NoteList />
    </div>
  );
};

export default App;
