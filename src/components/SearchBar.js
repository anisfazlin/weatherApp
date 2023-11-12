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

function SearchBar({ setWeatherData }) {
  const [location, setLocation] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
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
        placeholder="Enter location" />
      <button onClick={handleSearch} variant="primary">Search</button>
    </div>
  );
}

export default SearchBar;