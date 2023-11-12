import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

const ForecastWrapper = styled.div`
  padding: 20px;
  border-radius: 10px;
  max-height: 500px;
  min-width: 1400px;
  overflow-y: auto;
  background-color: #007bff;
  color: #fff;
`;

const ForecastRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #fff;
`;

function Forecast({ city }) {
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`);
      setForecastData(response.data.list);
    };

    if (city) {
      fetchForecastData();
    }
  }, [city]);

  if (!forecastData) {
    return <div>Loading Forecast...</div>;
  }

  // Group forecast data by day
  const groupedByDay = forecastData.reduce((groups, data) => {
    const date = new Date(data.dt_txt);
    const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
    if (!groups[dayOfWeek]) {
      groups[dayOfWeek] = [];
    }
    groups[dayOfWeek].push(data);
    return groups;
  }, {});

  return (
    <ForecastWrapper>
      {Object.entries(groupedByDay).map(([day, data], index) => (
        <ForecastRow key={index}>
          <h2>{day}</h2>
          {data.map((item, index) => {
            const time = new Date(item.dt_txt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
            const tempCelsius = item.main.temp - 273.15;
            const feelsLikeCelsius = item.main.feels_like - 273.15;
            return (
              <div key={index}>
                <b>{time}</b>
                <p>Temperature: <br />{tempCelsius.toFixed(2)}°C</p>
                {/* <p>Feels Like: <br />{feelsLikeCelsius.toFixed(2)}°C</p> */}
                <p>Weather: <br />{item.weather[0].description}</p>
              </div>
            );
          })}
        </ForecastRow>
      ))}
    </ForecastWrapper>
  );
}

export default Forecast;