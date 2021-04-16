import { useDispatch } from 'react-redux';

import { setFilter } from '../reducers/filter.reducer';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = e => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <div style={{ marginBottom: 15 }}>
      filter
      <input name='filter' onChange={handleChange} type='text' />
    </div>
  );
};

export default Filter;
