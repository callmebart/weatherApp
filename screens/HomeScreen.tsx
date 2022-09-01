import { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { HomeScreenScreenRouteProp } from '../navigation/types'
import * as Location from 'expo-location';
import { PermissionStatus } from "../types/enums";
import { LocationObject } from "expo-location";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';
import AbsoluteLoader from "../components/AbsoluteLoader";
import getUniqueWeatherData from "../utils/getUniqueWeatherData";
import WeeklyListElement from "../components/WeeklyListElement";
import Spacer from "../components/Spacer";
import { useIsFocused } from "@react-navigation/native";
import globalInfo from "../store/GlobalInfo";
import { API_KEY, LANG, UNITS } from "../consts/openWeather";
import getRecalculatedValue from "../utils/getRecalculatedValue";
import globalStore from "../store/GlobalSettings";
import { Observer } from "mobx-react-lite";

export default function HomeScreen({ navigation }: HomeScreenScreenRouteProp) {

    const [currentLocation, setCurrentLocation] = useState<LocationObject | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [dailyForecastData, setDailyForecastData] = useState<any>();
    const [currentWeather, setCurrentWeather] = useState<any>()
    const isFocused = useIsFocused();

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === PermissionStatus.GRANTED) {
                const location = await Location.getCurrentPositionAsync({});
                setCurrentLocation(location);
            } else {
                navigation.navigate("ErrorScreen");
            }
            return;
        })();
    }, [isFocused, isLoading]);

    useEffect(() => {
        if (currentLocation) {
            getDailyForecast();
            getCurrentWeather();
        }
    }, [currentLocation]);


    const getDailyForecast = async () => {
        const URL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + currentLocation?.coords.latitude + "&lon=" + currentLocation?.coords.longitude + "&appid=" + API_KEY + "&units=" + UNITS + "&lang=" + LANG;
        fetch(URL).then(res => res.json())
            .then((data) => {
                globalInfo.setDailyForecast(data);
                const uniqueData = getUniqueWeatherData(data);
                setDailyForecastData(uniqueData);
            })
    };
    const getCurrentWeather = async () => {
        const URL = "https://api.openweathermap.org/data/2.5/weather?lat=" + currentLocation?.coords.latitude + "&lon=" + currentLocation?.coords.longitude + "&appid=" + API_KEY + "&units=" + UNITS + "&lang=" + LANG;
        fetch(URL).then(res => res.json())
            .then((data) => {
                setCurrentWeather(data);
            })
    };


    const dailyForecastElemenst = dailyForecastData?.map((item: any, index: number) => {
        return <WeeklyListElement item={item} index={index} key={index} />
    });

    const currentTemp = getRecalculatedValue(currentWeather?.main.feels_like || null)

    useEffect(() => {
        if (isLoading && currentWeather?.main && dailyForecastData) {
            setIsLoading(false);
        }
    }, [isLoading, currentWeather, dailyForecastData])

    return (
        <SafeAreaView style={styles.container}>

            <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")} style={styles.burgerMenu}>
                <Feather name="menu" size={30} color="black" />
            </TouchableOpacity>

            <Spacer spacingValue={6} />
            {isLoading
                ? <AbsoluteLoader />
                : <View style={styles.dailyForecast}>
                    <View style={styles.currentWeatherContainer}>
                        <Spacer spacingValue={10} />
                        <Observer>
                            {
                                () => <Text style={styles.currentTemp}>{currentTemp} {globalStore.unit}</Text>
                            }
                        </Observer>
                    </View>
                    <View style={{ flex: 1 }}>
                        {dailyForecastElemenst}
                    </View>
                </View>
            }

        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        paddingHorizontal: 30,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
    },
    burgerMenu: {
        position: "absolute",
        top: 40,
        right: 20,
    },
    dailyForecast: {
        justifyContent: "center",
        alignItems: "center",
    },
    currentTemp: {
        fontSize: 70,
        alignSelf: "center",
    },
    currentWeatherContainer: {
        flex: 1,
        width: "100%",
    },
})