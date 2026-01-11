import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api'; // ඔබේ Backend URL එක මෙහි යොදන්න

export const fetchWeatherData = async (token) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/weather`, {
      headers: {
        Authorization: `Bearer ${token}` // Auth0 මගින් ලැබෙන Token එක [cite: 10]
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};