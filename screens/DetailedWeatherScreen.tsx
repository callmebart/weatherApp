import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, ImageSourcePropType, Image, Dimensions } from 'react-native'
import BoxDetailedList from "../components/BoxDetailedList";
import { DetailedWeatherScreenScreenRouteProp } from "../navigation/types"
import { Feather } from '@expo/vector-icons';
import getRecalculatedValue from "../utils/getRecalculatedValue";
import globalStore from "../store/GlobalSettings";
import globalInfo from "../store/GlobalInfo";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import { Observer } from "mobx-react-lite";
import { Octicons } from '@expo/vector-icons';
import hourlyForecast from "../store/HourlyForecast";
import Spacer from "../components/Spacer";

const windowWidth = Dimensions.get("window").width;

export default function DetailedWeatherScreen({ navigation, route }: DetailedWeatherScreenScreenRouteProp) {

    const item = route.params.item;
    const currentTemp = getRecalculatedValue(item.main.temp_max);
    const currentDate = new Date(item.dt_txt.slice(0, 10)).toDateString();

    const hourlyForecastData = hourlyForecast.grouppedForecastData[item.dt_txt.slice(0, 10)];

    const hourlyForecastList = hourlyForecastData.map((item: any) => {
        const temp = getRecalculatedValue(item.main.feels_like);
        const time = item.dt_txt.slice(10, 16);
        return (
            <View style={styles.hourlyBoxContainer}>
                <Text style={styles.scrollViewElementText}>{time}</Text>
                <Image
                    source={{ uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` } as ImageSourcePropType}
                    style={styles.icon}
                />
                <Text style={styles.scrollViewElementText}>{temp} {globalStore.unit}</Text>
            </View>
        )
    })

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.pageCloseContainer}>
                <Feather name="x" size={35} color="#404142" />
            </TouchableOpacity>
            <View style={styles.mainDataContainer}>
                <View style={styles.locationContainer}>
                    <Octicons name="location" size={28} color="#404142" />
                    <Observer>
                        {
                            () => <Text style={styles.locationName}>{globalInfo.fetchedData.city.name}</Text>
                        }
                    </Observer>
                </View>
                <View style={styles.rowBoxContainer}>
                    <View style={[styles.row]}>
                        <Text style={styles.mainTemp}>{currentTemp}</Text>
                        <View>
                            <Text style={styles.weatherDescription}>{globalStore.unit}</Text>
                            <Text style={styles.weatherDescription}>{capitalizeFirstLetter(item.weather[0].description)}</Text>
                        </View>
                    </View>
                    <Text style={styles.currentDate}>{currentDate}</Text>
                </View>
            </View>
            <ScrollView style={styles.flexOne}>
                <ScrollView horizontal style={styles.horizontalScrollView}>
                    {hourlyForecastList}
                </ScrollView>
                <View style={styles.breakLine} />
                <BoxDetailedList item={item} />
                <Spacer spacingValue={20} />
            </ScrollView>

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
    },
    flexOne: {
        flex: 1,
    },
    mainDataContainer: {
        flex: 1.2,
        width: "100%",
    },
    locationName: {
        fontSize: 30,
        marginLeft: 10,
        color: "#404142",
    },
    locationContainer: {
        marginTop: 100,
        marginLeft: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    mainTemp: {
        fontSize: 60,
        marginRight: 10,
        color: "#404142",
    },
    pageCloseContainer: {
        position: "absolute",
        marginTop: 40,
        right: 20,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    rowBoxContainer: {
        position: "absolute",
        bottom: 20,
        left: 20,
    },
    inRowBox: {
        width: 160,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
    weatherDescription: {
        fontSize: 25,
        color: "#404142",
    },
    currentDate: {
        marginLeft: 10,
        fontWeight: "bold",
        color: "#404142",
    },
    hourlyBoxContainer: {
        height: 100,
        width: 60,
        margin: 5,
        justifyContent: "center",
        alignItems: "center",
    },
    icon: {
        width: 40,
        height: 40,
    },
    horizontalScrollView: {
        width: windowWidth - 20,
        alignSelf: "center",
    },
    breakLine: {
        height: 1,
        backgroundColor: "#404142",
        opacity: 0.1,
        width: windowWidth - 40,
        alignSelf: "center",
        marginVertical: 8,
    },
    scrollViewElementText: {
        color: "#404142",
    },
})