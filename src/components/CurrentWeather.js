import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
// const apiKey = "35afad432b25150f5e8eb7b12dafe2f5";

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

function CurrentWeather({ weatherData }) {
  if (!weatherData) {
    return <div>Loading current weather ..</div>;
  }

  return (
    <div>
      <h1>{weatherData.name}</h1>
      <p>{(weatherData.main.temp - 273.15).toFixed(2)}°C</p>
      <p>{weatherData.weather[0].description}</p>
    </div>
  );
}

export default CurrentWeather;