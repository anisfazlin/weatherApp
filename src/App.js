import React, { useState } from 'react';
import CurrentWeather from './components/CurrentWeather';
import Forecast from './components/Forecast';
import HistoricalData from './components/HistoricalData';
import SearchBar from './components/SearchBar';
import './App.css';

function App() {
  const [location, setLocation] = useState('');

  const handleLocationChange = (newLocation) => {
    setLocation(newLocation);
  };

  return (
    <div className="App">
      <SearchBar onLocationChange={handleLocationChange} />
      <CurrentWeather location={location} />
      <Forecast location={location} />
      <HistoricalData location={location} />
    </div>
  );
}

export default App;