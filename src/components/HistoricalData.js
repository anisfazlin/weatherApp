import React, { useState, useEffect } from 'react';
import axios from 'axios';

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

const HistoricalData = ({ location }) => {
  const [historicalData, setHistoricalData] = useState(null);

  useEffect(() => {
    const fetchHistoricalData = async () => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${location.lat}&lon=${location.lon}&dt=${Math.floor(Date.now() / 1000) - 60 * 60 * 24 * 5}&appid=YOUR_OPENWEATHERMAP_API_KEY`);
        setHistoricalData(response.data);
      } catch (error) {
        console.error("Error fetching historical data: ", error);
      }
    };

    if (location) {
      fetchHistoricalData();
    }
  }, [location]);

  if (!historicalData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Historical Weather Data</h2>
      {historicalData.hourly.map((hour, index) => (
        <div key={index}>
          <p>Time: {new Date(hour.dt * 1000).toLocaleTimeString()}</p>
          <p>Temperature: {hour.temp}°C</p>
          <p>Humidity: {hour.humidity}%</p>
        </div>
      ))}
    </div>
  );
};

export default HistoricalData;