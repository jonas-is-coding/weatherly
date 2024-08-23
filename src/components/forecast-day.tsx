import { View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const ForecastDay = ({
  image,
  day,
  temperature,
  active,
  onPress,
}: {
  image: any;
  day: string;
  temperature: number;
  active: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      className=""
      onPress={onPress}
    >
      <LinearGradient
        colors={active ? ["#020727", "#020e5e"] : ["#020727", "#020727"]}
        className="flex items-center justify-center space-y-2 w-32 py-6 relative"
      >
      <Text className={`text-lg ${active ? "text-white" : "text-gray-400"}`}>
        {day}
      </Text>
      <Image source={image} className="h-12 w-12 my-2" />
      <Text className={`text-2xl ${active ? "text-white" : "text-gray-400"}`}>
        {temperature}°
      </Text>
      <View className={`absolute bottom-0 h-[1px] w-full ${active ? "bg-white" : "bg-gray-600"}`} />
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default ForecastDay;