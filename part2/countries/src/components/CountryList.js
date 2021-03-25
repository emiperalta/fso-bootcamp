import React from 'react';

const CountryList = ({ handleClick, name }) => {
  return (
    <section>
      <span key={name}>{name}</span>
      <button onClick={handleClick}>show</button>
    </section>
  );
};

export default CountryList;
