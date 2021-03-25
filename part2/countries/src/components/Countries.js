import React from 'react';

import CountryDetail from './CountryDetails';
import CountryList from './CountryList';

const Countries = ({ countries, countryName, setCountryName }) => {
  const handleClick = e => {
    const country = e.target.parentNode.children[0].textContent;
    setCountryName(country);
  };

  const filteredCountries = countries.filter(({ name }) =>
    name.toLocaleLowerCase().startsWith(countryName.toLocaleLowerCase())
  );

  return countryName && filteredCountries.length > 10 ? (
    <section>Too many matches, specify another filter</section>
  ) : filteredCountries.length > 1 && filteredCountries.length < 10 ? (
    filteredCountries.map(country => (
      <CountryList
        handleClick={handleClick}
        key={country.name}
        name={country.name}
      />
    ))
  ) : (
    filteredCountries.length === 1 &&
    filteredCountries.map(country => (
      <CountryDetail
        capital={country.capital}
        flag={country.flag}
        key={country.name}
        lang={country.languages}
        name={country.name}
        population={country.population}
      />
    ))
  );
};

export default Countries;
