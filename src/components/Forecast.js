import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

const ForecastWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ForecastCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 10px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
`;

const Forecast = ({ city }) => {
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid={YOUR_API_KEY}`);
      setForecastData(response.data);
    };

    if (city) {
      fetchForecastData();
    }
  }, [city]);

  return (
    <ForecastWrapper>
      {forecastData && forecastData.list.map((data, index) => (
        <ForecastCard key={index}>
          <h2>{data.dt_txt}</h2>
          <p>Temperature: {data.main.temp}°C</p>
          <p>Humidity: {data.main.humidity}%</p>
          <p>Wind Speed: {data.wind.speed} m/s</p>
        </ForecastCard>
      ))}
    </ForecastWrapper>
  );
};

export default Forecast;