import axios from 'axios';
import { api_key } from "./api";



export const fetchWeatherData = async (search, state) => {
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${search},${state},US&appid=${api_key}`;
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

export const fetchForecastData = async (search, state) => {
  const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${search},${state},US&appid=${api_key}`;
  try {
    const response = await axios.get(forecastURL);
    return response.data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    throw error;
  }
};