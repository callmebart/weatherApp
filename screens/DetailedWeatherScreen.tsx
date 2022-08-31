import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import BoxDetailedList from "../components/BoxDetailedList";
import { DetailedWeatherScreenScreenRouteProp } from "../navigation/types"
import { Feather } from '@expo/vector-icons';
import getRecalculatedValue from "../utils/getRecalculatedValue";
import globalStore from "../store/GlobalSettings";
import globalInfo from "../store/GlobalInfo";
import capitalizeFirstLetter from "../utils/capitalizeFirstLetter";
import { Observer } from "mobx-react-lite";
import { Octicons } from '@expo/vector-icons';


export default function DetailedWeatherScreen({ navigation, route }: DetailedWeatherScreenScreenRouteProp) {

    const item = route.params.item;
    const currentTemp = getRecalculatedValue(item);
    const currentDate = new Date(item.dt_txt.slice(0, 10)).toDateString();

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.pageCloseContainer}>
                <Feather name="x" size={40} color="#404142" />
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
            <BoxDetailedList item={item} />
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
    },
    mainDataContainer: {
        flex: 1.5,
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
        bottom: 40,
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
})