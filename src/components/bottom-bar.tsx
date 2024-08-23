import React, { useRef } from "react";
import {
  Animated,
  Image,
  PanResponder,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { WINDOW_HEIGHT } from "../constants";
import Divider from "./ui/divider";
import ForecastDay from "./forecast-day";
import { getWeatherImage } from "../lib/get-weather-image";
import { MoveUp } from "lucide-react-native";

const MAX_HEIGHT = WINDOW_HEIGHT * 0.85;
const MIN_HEIGHT = WINDOW_HEIGHT * 0.19;
const MAX_UP = MIN_HEIGHT - MAX_HEIGHT;
const MAX_DOWN = 0.3;
const DRAG_THRESHOLD = 50;

const BottomBar = ({
  weather,
  onDaySelect,
  selectedDayIndex, // Akzeptiere selectedDayIndex als Prop
}: {
  weather: any;
  onDaySelect: (index: number) => void;
  selectedDayIndex: number; // Prop-Typ definieren
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const lastGestureDy = useRef(0);
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        animatedValue.setOffset(lastGestureDy.current);
      },
      onPanResponderMove: (e, gesture) => {
        animatedValue.setValue(gesture.dy);
      },
      onPanResponderRelease: (e, gesture) => {
        animatedValue.flattenOffset();
        lastGestureDy.current += gesture.dy;

        if (gesture.dy) {
          if (gesture.dy <= DRAG_THRESHOLD) {
            springAnimation("up");
          } else {
            springAnimation("down");
          }
        } else {
          if (gesture.dy >= -DRAG_THRESHOLD) {
            springAnimation("down");
          } else {
            springAnimation("up");
          }
        }
      },
    })
  ).current;

  const springAnimation = (direction: "up" | "down") => {
    lastGestureDy.current = direction === "down" ? MAX_DOWN : MAX_UP;
    Animated.spring(animatedValue, {
      toValue: lastGestureDy.current,
      useNativeDriver: true,
    }).start();
  };

  const bottomSheetAnimation = {
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [MAX_UP, MAX_DOWN],
          outputRange: [MAX_UP, MAX_DOWN],
          extrapolate: "clamp",
        }),
      },
    ],
  };

  const location = weather?.location || {};
  const windDegree = weather?.current?.wind_degree || 0;
  const forecast = weather?.forecast?.forecastday || [];

  const rotation = windDegree + "deg";

  return (
    <Animated.View
      className="absolute w-full bg-primary rounded-t-xl px-5 z-50 shadow-lg shadow-[#7096ff]"
      style={[styles.bottomSheet, bottomSheetAnimation]}
    >
      <View
        className="w-32 h-8 self-center justify-center items-center"
        {...panResponder.panHandlers}
      >
        <View className="h-1 w-10 bg-gray-600 rounded-full" />
      </View>
      <View className="w-full py-3 flex flex-row justify-between items-center mb-2">
        <View>
          <Text className="text-3xl text-white font-semibold">
            {location.name}
          </Text>
          <Text className="text-lg text-gray-400">{location.country}</Text>
        </View>
        <View style={{ transform: [{ rotate: rotation }] }}>
        <MoveUp className="h-28 w-28 text-white" />
        </View>
      </View>
      <Divider />
      <ScrollView horizontal className="flex flex-row max-h-48 mt-5">
        {forecast.map((day: any, index: number) => {
          let date = new Date(day.date);
          let dayName = date.toLocaleDateString("en-US", { weekday: "long" });

          const temperature = Math.floor(day?.day?.avgtemp_c)

          return (
            <ForecastDay
              key={index}
              image={getWeatherImage(day.day.condition.text, true)}
              day={dayName}
              temperature={temperature}
              active={index === selectedDayIndex}
              onPress={() => onDaySelect(index)}
            />
          );
        })}
      </ScrollView>
      <Text className="text-purple-300 text-5xl mt-5">...</Text>
      <Text className="text-[22px] text-gray-400 font-light mt-3">
        Tomorrow will be a good day for a{"\n"}trip. Here are beautiful places
        in{"\n"}
        {location.name}
      </Text>
      <ScrollView horizontal className="flex flex-row max-h-40">
        
      </ScrollView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  bottomSheet: {
    height: MAX_HEIGHT,
    bottom: MIN_HEIGHT - MAX_HEIGHT,
  },
});

export default BottomBar;