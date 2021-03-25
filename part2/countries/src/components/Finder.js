import React from 'react';

const Finder = ({ handleChange, countryName }) => {
  return (
    <div>
      find countries: <input onChange={handleChange} value={countryName} />
    </div>
  );
};

export default Finder;
