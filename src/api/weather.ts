import axios from "axios";
import { apiKey } from "../constants";

const forecastEndpoint = (params: { lat: number, lon: number, days: number }) =>
  `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${params.lat},${params.lon}&days=${params.days}&aqi=yes&alerts=yes`;

const locationsEndpoint = (params: { cityName: string, country?: string }) =>
  `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${params.cityName}${params.country ? `,${params.country}` : ''}`;

const apiCall = async (endpoint: string) => {
  const options = {
    method: "GET",
    url: endpoint,
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

export const fetchWeatherForecast = (params: { lat: number, lon: number, days: number }) => {
  let forecastUrl = forecastEndpoint(params);
  return apiCall(forecastUrl);
};

export const fetchLocations = (params: { cityName: string, country?: string }) => {
  let locationsUrl = locationsEndpoint(params);
  return apiCall(locationsUrl);
};