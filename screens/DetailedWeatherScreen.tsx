import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageSourcePropType, Image, Dimensions, ImageBackground } from 'react-native'
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
import getBackgroundImage from "../utils/getBackgroundImage";
import { themeMode } from "../utils/themeMode";
import { useTheme } from "../hooks/ThemeProvider";

const windowWidth = Dimensions.get("window").width;

export default function DetailedWeatherScreen({ navigation, route }: DetailedWeatherScreenScreenRouteProp) {

    const item = route.params.item;
    const backgroudImageSource = getBackgroundImage();
    const { theme } = useTheme();
    const styles = useStyles(themeMode[theme].color)

    const currentTemp = getRecalculatedValue(item.main.temp_max);
    const currentDate = new Date(item.dt_txt.slice(0, 10)).toDateString();

    const hourlyForecastData = hourlyForecast.grouppedForecastData[item.dt_txt.slice(0, 10)];

    const hourlyForecastList = hourlyForecastData.map((item: any, index: number) => {
        const temp = getRecalculatedValue(item.main.feels_like);
        const time = item.dt_txt.slice(10, 16);
        return (
            <View style={styles.hourlyBoxContainer} key={index}>
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
        <View style={styles.container}>
            <ImageBackground source={backgroudImageSource} resizeMode="cover" style={styles.image}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.pageCloseContainer}>
                    <Feather name="x" size={35} color={themeMode[theme].color} />
                </TouchableOpacity>
                <View style={styles.mainDataContainer}>
                    <View style={styles.locationContainer}>
                        <Octicons name="location" size={28} color={themeMode[theme].color} />
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
            </ImageBackground>
        </View>
    )
}

const useStyles = (color: string) => StyleSheet.create({
    image: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: "white",
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
        color: color,
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
        color: color,
    },
    pageCloseContainer: {
        zIndex:10,
        position: "absolute",
        top: 40,
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
        color: color,
    },
    currentDate: {
        marginLeft: 10,
        fontWeight: "bold",
        color: color,
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
        color: color,
    },
})