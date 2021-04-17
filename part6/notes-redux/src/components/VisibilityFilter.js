import { useDispatch } from 'react-redux';

import { filterChange } from '../reducers/filter.reducer';

const VisibilityFilter = () => {
  const dispatch = useDispatch();

  const filterSelected = value => {
    dispatch(filterChange(value));
  };

  return (
    <div>
      all
      <input name='filter' type='radio' onClick={() => filterSelected('ALL')} />
      important
      <input
        name='filter'
        type='radio'
        onClick={() => filterSelected('IMPORTANT')}
      />
      non important
      <input
        name='filter'
        type='radio'
        onClick={() => filterSelected('NONIMPORTANT')}
      />
    </div>
  );
};

export default VisibilityFilter;
