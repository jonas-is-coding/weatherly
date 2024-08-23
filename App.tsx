import React, { useState, useEffect } from 'react';
import { TouchableWithoutFeedback, View, Keyboard } from 'react-native';
import SplashScreen from './src/components/splash-screen';
import { fetchWeatherForecast } from "./src/api/weather";
import * as Location from 'expo-location';
import HomeScreen from './src/screens/home-screen';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [weather, setWeather] = useState({});

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error("Location permission not granted");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});

      const { latitude, longitude } = location.coords;

      const data = await fetchWeatherForecast({ lat: latitude, lon: longitude, days: 7 });
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather data: ", error);
    } finally {
      setIsReady(true);
    }
  };

  return (
      <View style={{ flex: 1 }}>
        {isReady ? <HomeScreen weather={weather} /> : <SplashScreen />}
      </View>
  );
}