import React, { FunctionComponent, useEffect } from 'react';
import { toDate } from './tools';
import { CityWeatherProps } from '../types/CityWeather';

export const CityWeather: FunctionComponent<CityWeatherProps> = ({ name, country, description, icon, windSpeed, temp }) => (
  <div>
    CityWeather
  </div>
)

