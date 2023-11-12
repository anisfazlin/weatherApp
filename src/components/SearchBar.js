import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ setWeatherData }) => {
  const [location, setLocation] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid={YOUR_API_KEY}`);
      setWeatherData(response.data);
    } catch (error) {
      console.error(`Failed to fetch weather data: ${error}`);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={location}
        onChange={e => setLocation(e.target.value)}
        placeholder="Enter location"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;