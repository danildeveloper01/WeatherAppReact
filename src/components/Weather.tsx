import React, { FunctionComponent, useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import { InfinitySpin } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import { WeatherResponse } from '../types/WeatherResponse';
import { CityWeather } from './CityWeather';
import { toDate } from './tools';

const Weather: FunctionComponent = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState<{ loading: Boolean, data?: WeatherResponse, error: Boolean }>({
    loading: false,
    data: undefined,
    error: false,
  });

  const search = (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      setQuery('');
      setWeather({ ...weather, loading: true });
      const url = 'https://api.openweathermap.org/data/2.5/weather';
      const appid = 'f00c38e0279b7bc85480c3fe775d518c';
      const params = {
        q: query,
        units: 'metric',
        appid: appid,
      };

      axios.get(url, { params })
        .then((res) => {
          console.log('res', res);
          setWeather({ data: res.data, loading: false, error: false });
        })
        .catch((error) => {
          setWeather({ ...weather, data: undefined, error: true });
          setQuery('');
          console.log('error', error);
        });
    }
  };

  return (
    <div>
      <h1 className="app-name">
        Weather App<span>🌤</span>
      </h1>
      <div className="search-bar">
        <input
          type="text"
          className="city-search"
          placeholder="Search City.."
          name="query"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={search}
        />
      </div>

      {weather.loading && (
        <>
          <br />
          <br />
          <InfinitySpin width="100px" />
        </>
      )}
      {weather.error && (
        <>
          <br />
          <br />
          <span className="error-message">
            <FontAwesomeIcon icon={faFrown} />
            <span style={{ fontSize: '20px' }}> Sorry, City not found</span>
          </span>
        </>
      )}

      {weather && weather.data && weather.data.main && (
        <div>
          <div className="city-name">
            <h2>
              {weather.data.name}, <span>{weather.data.sys.country}</span>
            </h2>
          </div>
          <div className="date">
            <span>{toDate()}</span>
          </div>
          <div className="icon-temp">
            <img
              className=""
              src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
              alt={weather.data.weather[0].description}
            />
            {Math.round(weather.data.main.temp)}
            <sup className="deg">&deg;C</sup>
          </div>
          <div className="des-wind">
            <p>{weather.data.weather[0].description.toUpperCase()}</p>
            <p>Wind Speed: {weather.data.wind.speed}m/s</p>
          </div>
          {/* Additional weather information */}
          <div className="des-wind extra-info">
            <p>Humidity: {weather.data.main.humidity}%</p>
            <p>Max Temperature: {weather.data.main.temp_max}&deg;C</p>
            <p>Visibility: {weather.data.visibility} meters</p>
            <p>Wind Direction: {weather.data.wind.deg}&deg;</p>
            <p>Cloudiness: {weather.data.clouds.all}%</p>
            <p>Sunrise: {new Date(weather.data.sys.sunrise * 1000).toLocaleTimeString('en-US')}</p>
            <p>Sunset: {new Date(weather.data.sys.sunset * 1000).toLocaleTimeString('en-US')}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
