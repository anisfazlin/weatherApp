import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

const WeatherContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CurrentWeather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY`);
        setWeatherData(response.data);
      } catch (error) {
        console.error("Error fetching weather data: ", error);
      }
    };

    if (city) {
      fetchWeatherData();
    }
  }, [city]);

  if (!weatherData) return null;

  return (
    <WeatherContainer>
      <h2>Current Weather in {city}</h2>
      <p>Temperature: {weatherData.main.temp}°C</p>
      <p>Humidity: {weatherData.main.humidity}%</p>
      <p>Wind Speed: {weatherData.wind.speed} m/s</p>
    </WeatherContainer>
  );
};

export default CurrentWeather;