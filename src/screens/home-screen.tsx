import React, { useState } from "react";
import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import BottomBar from "../components/bottom-bar";
import NavBar from "../components/navbar";
import Main from "../components/main";

interface HomeScreenProps {
  weather: any;
}

export default function HomeScreen({ weather }: HomeScreenProps) {
  const [currentWeather, setCurrentWeather] = useState(weather);
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(0);

  const handleLocationSelect = (data: any) => {
    setCurrentWeather(data);
  };

  const handleDaySelect = (index: number) => {
    setSelectedDayIndex(index);
  };

  const handleOutsideClick = () => {
    Keyboard.dismiss();
  };

  return (
    <View className="flex-1 justify-center items-center bg-primary">
      <NavBar
        weather={currentWeather}
        onLocationSelect={handleLocationSelect}
      />
      <TouchableWithoutFeedback onPress={handleOutsideClick}>
        <View className="flex-1 w-full">
          <Main weather={currentWeather} selectedDayIndex={selectedDayIndex} />
        </View>
      </TouchableWithoutFeedback>
      <BottomBar weather={currentWeather} onDaySelect={handleDaySelect} selectedDayIndex={selectedDayIndex}  />
    </View>
  );
}