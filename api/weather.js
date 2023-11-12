const axios = require('axios');
// const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
const apiKey = "35afad432b25150f5e8eb7b12dafe2f5";

module.exports = async (req, res) => {
  const { city } = req.query;

  try {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching weather data' });
  }
};