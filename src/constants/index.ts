import { Dimensions } from "react-native";

export const apiKey = process.env.EXPO_PUBLIC_WEATHER_API_KEY

export const weatherImages: Record<string, any> = {
  // Day Images
  "Clear Day": require('../assets/images/weather/clear-day.png'),
  "Partly Cloudy Day": require('../assets/images/weather/cloudy-day.png'),
  "Windy Day": require("../assets/images/weather/windy-day.png"),
  "Rainy Day": require("../assets/images/weather/rainy-day.png"),
  "Snowy Day": require("../assets/images/weather/snowy-day.png"),
  "Stormy Day": require("../assets/images/weather/stormy-day.png"),

  // Night Images
  "Clear Night": require("../assets/images/weather/clear-night.png"),
  "Partly Cloudy Night": require('../assets/images/weather/cloudy-night.png'),
  "Windy Night": require("../assets/images/weather/windy-night.png"),
  "Rainy Night": require("../assets/images/weather/rainy-night.png"),
  "Snowy Night": require("../assets/images/weather/snowy-night.png"),
  "Stormy Night": require("../assets/images/weather/stormy-night.png"),
};

export const { width: WINDOW_WIDTH, height: WINDOW_HEIGHT} = 
  Dimensions.get("window")