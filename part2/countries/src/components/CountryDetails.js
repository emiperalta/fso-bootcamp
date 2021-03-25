import React from 'react';

const CountryDetail = ({ capital, flag, lang, name, population }) => {
  return (
    <div>
      <h1>{name}</h1>
      <section>capital {capital}</section>
      <section>population {population}</section>

      <h2>languages</h2>
      <ul>
        {lang.map(l => (
          <li key={l.name}>{l.name}</li>
        ))}
      </ul>

      <img alt='flag' src={flag} width='150px' />
    </div>
  );
};

export default CountryDetail;
