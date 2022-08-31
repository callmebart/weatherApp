import { useCallback, useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Button, AppState, Linking, TouchableOpacity } from 'react-native'
import { HomeScreenScreenRouteProp } from '../navigation/types'
import * as Location from 'expo-location';
import { PermissionStatus } from "../types/enums";
import { LocationObject } from "expo-location";
import { isIOS } from "../utils/platform";
import { Modal } from "../components/Modal";
import { locationPermissions } from "../consts/en";
import SettingsButton from "../components/SettingsButton";
import { API_KEY } from "../consts/openWeather";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';
import AbsoluteLoader from "../components/AbsoluteLoader";
import getUniqueWeatherData from "../utils/getUniqueWeatherData";
import WeeklyListElement from "../components/WeeklyListElement";
import Spacer from "../components/Spacer";
import { useIsFocused } from "@react-navigation/native";
import globalInfo from "../store/GlobalInfo";

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
    }, [isFocused]);

    useEffect(() => {
        if (currentLocation) {
            getDailyForecast();
            setIsLoading(false);
        }
    }, [currentLocation]);


    const getDailyForecast = async () => {
        globalInfo.getDailyForecast(currentLocation);
        const uniqueData = getUniqueWeatherData(globalInfo.fetchedData);
        setDailyForecastData(uniqueData);
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