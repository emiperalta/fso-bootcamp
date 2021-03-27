import React from 'react';

const Filter = ({ handleChange, nameFilter }) => {
  return (
    <div>
      filter shown with
      <input onChange={handleChange} value={nameFilter} />
    </div>
  );
};

export default Filter;
