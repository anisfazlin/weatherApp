import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import HistoricalData from './components/HistoricalData';
import SearchBar from './components/SearchBar';
import './App.css';
const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (location) {
        const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
        setWeatherData(response.data);
      }
    };

    fetchWeatherData();
  }, [location]);

  return (
    <div className="App">
      <SearchBar setWeatherData={setWeatherData} onLocationChange={handleLocationChange} />
      <CurrentWeather weatherData={weatherData} />
      <Forecast city={weatherData && weatherData.name} />
      {/* <HistoricalData weatherData={weatherData} /> */}
    </div>
  );
}

export default App;