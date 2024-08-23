import { Image, Text, View } from "react-native";
import { getWeatherImage } from "../lib/get-weather-image";
import { timeToHour } from "../lib/time";
import moment from "moment-timezone";
import { weatherImages } from "../constants";
import Divider from "./ui/divider";

const Main = ({ weather, selectedDayIndex }: { weather: any, selectedDayIndex: number }) => {
  const forecast = weather?.forecast?.forecastday || [];
  const selectedDay = forecast[selectedDayIndex] || forecast[0];

  if (!selectedDay) return null;

  const sunrise = selectedDay.astro?.sunrise;
  const sunset = selectedDay.astro?.sunset;
  console.log("Sunset value:", sunset);

  const timezone = "Europe/Berlin";

  // Aktuelle Zeit
  const now = new Date();
  const currentHour = now.getHours() + now.getMinutes() / 60;

  // Umrechnen der Sunrise- und Sunset-Zeiten in Stunden
  const sunriseHour = sunrise ? timeToHour(sunrise) : 0;
  const sunsetHour = sunset ? timeToHour(sunset) : 24;

  // Überprüfen, ob es Tag oder Nacht ist
  const isDay = currentHour >= sunriseHour && currentHour < sunsetHour;

  const dayConditionText = selectedDay?.day?.condition?.text;
  const forecastImage = getWeatherImage(dayConditionText, isDay);
  const temperature = Math.floor(selectedDay?.day?.avgtemp_c);
  const avgHumidity = selectedDay?.day?.avghumidity;
  const uvIndex = selectedDay?.day?.uv;
  const rainChance = selectedDay?.day?.daily_chance_of_rain;

  const formattedDate = moment(selectedDay.date).format("dddd, MMMM D, YYYY");

  return (
    <View className="flex-1 items-center pt-32 px-5 w-full">
      <Image source={forecastImage} className="h-80 w-80" />
      <View className="flex flex-row justify-center items-start w-full">
        <Text className="text-8xl text-white font-medium">{temperature}</Text>
        <Text className="text-6xl text-white font-extralight">°</Text>
        <Text className="text-6xl text-white font-medium">C</Text>
      </View>
      <Text className="text-2xl text-gray-400 font-light -mt-4">{formattedDate}</Text>
      <View className="flex flex-row items-center justify-between w-full mt-5">
        <View className="flex flex-row items-center justify-center gap-1">
          <Image source={weatherImages["Clear Day"]} className="h-10 w-10" />
          <View className="flex flex-col items-start justify-center">
            <Text className="font-light text-gray-400 -mb-1">Sunrise</Text>
            <Text className="font-medium text-white text-2xl">
              {moment.tz(sunrise, "HH:mm", timezone).format("HH:mm")}
            </Text>
          </View>
        </View>
        <View className="flex flex-row items-center justify-center gap-1">
          <Image source={weatherImages["Clear Night"]} className="h-12 w-12" />
          <View className="flex flex-col items-start justify-center">
            <Text className="font-light text-gray-400 -mb-1">Sunset</Text>
            <Text className="font-medium text-white text-2xl">
              {moment(sunset, "hh:mm A").format("HH:mm")}
            </Text>
          </View>
        </View>
      </View>
      <Divider />
      <View className="flex flex-row items-center justify-between w-full">
        <View className="flex flex-col items-start justify-center">
          <Text className="font-light text-gray-400 -mb-1">Humidity</Text>
          <Text className="font-medium text-white text-2xl">
            {avgHumidity}%
          </Text>
        </View>
        <View className="flex flex-col items-start justify-center">
          <Text className="font-light text-gray-400 -mb-1">UV Index</Text>
          <Text className="font-medium text-white text-2xl">
            {uvIndex}%
          </Text>
        </View>
        <View className="flex flex-col items-start justify-center">
          <Text className="font-light text-gray-400 -mb-1">Chance of rain</Text>
          <Text className="font-medium text-white text-2xl">
            {rainChance}%
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Main;