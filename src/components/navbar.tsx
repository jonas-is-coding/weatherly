import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { debounce } from "lodash";
import { fetchLocations, fetchWeatherForecast } from "../api/weather";
import { X, Search, MapPin } from "lucide-react-native";

interface NavBarProps {
  weather: any;
  onLocationSelect: (data: any) => void;
}

const NavBar = ({ weather, onLocationSelect }: NavBarProps) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [locations, setLocations] = useState([]);

  const handleSearch = (value: string) => {
    if (value.length > 2) {
      fetchLocations({ cityName: value }).then((data) => setLocations(data));
    }
  };

  const handleDebounce = useCallback(debounce(handleSearch, 1000), []);

  const handleLocationSelect = async (loc: any) => {
    setLocations([]);
    setShowSearchBar(false);

    if (loc.lat && loc.lon) {
      const data = await fetchWeatherForecast({
        lat: loc.lat,
        lon: loc.lon,
        days: 7,
      });
      onLocationSelect(data);
    } else {
      console.error("Location does not have coordinates");
    }
  };

  const handleBlur = () => {
    setShowSearchBar(false);
    setLocations([]);
  };

  const now = new Date();
  const hours = now.getHours();

  const greeting =
    hours < 12 ? "Guten Morgen" : hours < 18 ? "Guten Tag" : "Guten Abend";

  return (
    <View className="absolute top-12 left-0 flex flex-row items-center justify-between py-3 px-5 w-full z-40">
      <View
        className={`flex-row items-center justify-center ${
          showSearchBar ? "hidden" : "flex"
        }`}
      >
        <Text className="text-white text-3xl font-medium">{greeting}</Text>
      </View>
      <View
        className={`flex-row justify-end items-center rounded-full bg-transparent border border-white`}
      >
        {showSearchBar && (
          <TextInput
            onChangeText={handleDebounce}
            placeholder="Search City"
            className="h-12 pl-4 text-xl pb-1 flex-1 placeholder:text-gray-400"
            autoFocus={true}
            onBlur={handleBlur}
          />
        )}
        <TouchableOpacity
          onPress={() => setShowSearchBar(!showSearchBar)}
          className="p-3 rounded-full m-1"
        >
          {showSearchBar ? <X size={25} color="white" /> : <Search size={25} color="white" />}
        </TouchableOpacity>
      </View>

      {locations.length > 0 && showSearchBar && (
        <View
          className="absolute w-full top-16 rounded-3xl backdrop-blur-md mt-2 ml-5"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.6)",
          }}
        >
          {locations.map((loc: any, index) => {
            return (
              <TouchableOpacity
                onPress={() => handleLocationSelect(loc)}
                key={index}
                className="flex-row items-center m-1 p-3 px-4"
              >
                <MapPin size={20} color={"black"} />
                <Text className="text-black font-bold text-lg ml-2">
                  {loc.name}, {loc.country}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      )}
    </View>
  );
};

export default NavBar;
