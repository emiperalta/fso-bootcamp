import React, { useEffect, useState } from 'react';

const apiKey = process.env.REACT_APP_APIKEY;

const CountryDetail = ({ capital, flag, lang, name, population }) => {
  const [temp, setTemp] = useState('');
  const [icon, setIcon] = useState('');
  const [windSpeed, setWindSpeed] = useState(0);
  const [windDir, setWindDir] = useState('');

  useEffect(() => {
    fetch(
      `http://api.weatherstack.com/current?access_key=${apiKey}&query=${capital}`
    )
      .then(res => res.json())
      .then(data => {
        setTemp(data.current.temperature);
        setIcon(data.current.weather_icons[0]);
        setWindSpeed(data.current.wind_speed);
        setWindDir(data.current.wind_dir);
      });
  }, [capital]);

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

      <h2>Weather in {capital}</h2>
      <section>
        <strong>temperature:</strong> {temp} Celcius
      </section>
      <img alt='temp' src={icon} />
      <section>
        <strong>wind:</strong> {windSpeed} mph direction {windDir}
      </section>
    </div>
  );
};

export default CountryDetail;
