import { LocationObject } from "expo-location";
import { API_KEY, LANG, UNITS } from "../consts/openWeather";
import globalInfo from "../store/GlobalInfo";
import getUniqueWeatherData from "../utils/getUniqueWeatherData";

export const getDailyForecast2 = async (URL:string) => {
    fetch(URL).then(res => res.json())
        .then((data) => {
            return data;
        })
};