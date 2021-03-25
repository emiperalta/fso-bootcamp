import { useEffect, useState } from 'react';

import Countries from './components/Countries';
import Finder from './components/Finder';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryName, setCountryName] = useState('');

  useEffect(() => {
    fetch('https://restcountries.eu/rest/v2/all')
      .then(res => res.json())
      .then(data => setCountries(data));
  }, []);

  const handleChange = e => setCountryName(e.target.value);

  return (
    <>
      <Finder handleChange={handleChange} countryName={countryName} />
      <Countries
        countries={countries}
        countryName={countryName}
        setCountryName={setCountryName}
      />
    </>
  );
};

export default App;
