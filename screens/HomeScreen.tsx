import { useEffect, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
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

export default function HomeScreen({ navigation }: HomeScreenScreenRouteProp) {

    const [currentLocation, setCurrentLocation] = useState<LocationObject | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [dailyForecastData, setDailyForecastData] = useState<any>();
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
            setIsLoading(false);
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

    const dailyForecastElemenst = dailyForecastData?.map((item: any, index: number) => {
        return <WeeklyListElement item={item} index={index} key={index} />
    });


    return (
        <SafeAreaView style={styles.container}>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate("SettingsScreen")} style={styles.burgerMenu}>
                    <Feather name="menu" size={30} color="black" />
                </TouchableOpacity>
                <Spacer spacingValue={10} />
                {isLoading
                    ? <AbsoluteLoader />
                    : <View style={styles.dailyForecast}>
                        {dailyForecastElemenst}
                    </View>
                }
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        backgroundColor: "white",
    },
    burgerMenu: {
        position: "absolute",
        marginTop: 10,
        right: 0,
    },
    dailyForecast: {
        justifyContent: "center",
        alignItems: "center",
    },
})