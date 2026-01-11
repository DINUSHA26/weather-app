import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // Backend server URL

export const fetchWeatherData = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/weather`, {
      headers: {
        Authorization: `Bearer ${token}` // Include Auth0 token in request headers
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};