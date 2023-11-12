import React, { useState } from 'react';
import { Button } from '@primer/components'
import axios from 'axios';
import styled from 'styled-components';

const SearchBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
  background-color: #007bff; // Set the background color to blue
`;

const SearchInput = styled.input`
  margin-right: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #fff; // Set the button background color to white
  color: #007bff; // Set the button text color to blue
`;

const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

const SearchBar = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/weather?city=${location}`);
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
        onChange={(e) => setLocation(e.target.value)} 
        placeholder="Enter a city" 
      />
      <button onClick={handleSearch}>Search</button>
      {weatherData && (
        <div>
          <h3>{weatherData.name}</h3>
          <p>{weatherData.weather[0].description}</p>
          <p>{weatherData.main.temp}°F</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;