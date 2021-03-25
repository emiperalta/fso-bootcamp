import React from 'react';

import CountryDetail from './CountryDetails';

const Countries = ({ countryName, countries }) => {
  const filteredCountries = countries.filter(({ name }) =>
    name.toLocaleLowerCase().startsWith(countryName.toLocaleLowerCase())
  );

  return countryName && filteredCountries.length > 10 ? (
    <section>Too many matches, specify another filter</section>
  ) : filteredCountries.length > 1 && filteredCountries.length < 10 ? (
    filteredCountries.map(country => (
      <section key={country.name}>{country.name}</section>
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
