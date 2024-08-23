import { weatherImages } from "../constants";

export const getWeatherImage = (conditionText: string, isDay: boolean) => {
    const dayMapping: Record<string, string> = {
        "Clear": "Clear Day",
        "Partly Cloudy": "Partly Cloudy Day",
        "Windy": "Windy Day",
        "Rain": "Rainy Day",
        "Snow": "Snowy Day",
        "Storm": "Stormy Day",
        "Sunny": "Clear Day",
        "Patchy rain nearby": "Rainy Day",
        "Patchy rain possible": "Rainy Day",
        "Light rain": "Rainy Day",
        "Moderate rain": "Rainy Day",
        "Heavy rain": "Rainy Day",
        "Moderate or heavy rain shower": "Rainy Day",
        "Moderate or heavy rain with thunder": "Rainy Day",
        "Moderate or heavy freezing rain": "Rainy Day",
        "Mist": "Partly Cloudy Day",
        "Other": "Partly Cloudy Day"
    };

    const nightMapping: Record<string, string> = {
        "Clear": "Clear Night",
        "Partly Cloudy": "Partly Cloudy Night",
        "Windy": "Windy Night",
        "Rain": "Rainy Night",
        "Snow": "Snowy Night",
        "Storm": "Stormy Night",
        "Sunny": "Clear Night",
        "Patchy rain nearby": "Rainy Night",
        "Patchy rain possible": "Rainy Night",
        "Light rain": "Rainy Night",
        "Moderate rain": "Rainy Night",
        "Heavy rain": "Rainy Night",
        "Moderate or heavy rain shower": "Rainy Night",
        "Moderate or heavy rain with thunder": "Rainy Night",
        "Moderate or heavy freezing rain": "Rainy Night",
        "Mist": "Partly Cloudy Night",
        "Other": "Partly Cloudy Night"
    };

    const conditionTextClean = conditionText.trim();
    const conditionKey = isDay 
        ? dayMapping[conditionTextClean] || "Partly Cloudy Day"
        : nightMapping[conditionTextClean] || "Partly Cloudy Night";

    return weatherImages[conditionKey];
};