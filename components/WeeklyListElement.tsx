import { useNavigation } from "@react-navigation/native";
import { Observer } from "mobx-react-lite";
import { Text, Image, ImageSourcePropType, StyleSheet, TouchableOpacity } from 'react-native'
import { CELSIUS_UNIT } from "../consts/symbols";
import { RootStackParamList } from "../navigation/types";
import globalStore from "../store/GlobalSettings";
import getDayName from "../utils/getDayName";
import getRecalculatedValue from "../utils/getRecalculatedValue";

interface Props {
    item: any;
    index: number;
}

export default function WeeklyListElement({ item, index }: Props) {

    const elementDate = getDayName(item.dt_txt, index);
    const unit = getRecalculatedValue(item);
    const navigation = useNavigation<any>();

    return (
        <TouchableOpacity onPress={() => navigation.navigate("DetailedWeatherScreen", { item: item })} style={styles.container}>
            <Text numberOfLines={1} style={styles.dayName}>{elementDate}</Text>
            <Image
                source={{ uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` } as ImageSourcePropType}
                style={styles.icon}
            />
            <Text numberOfLines={1} style={styles.description}>{item.weather[0].description}</Text>
            <Text numberOfLines={1} style={styles.temperature}>
                {unit}
                {globalStore.unit}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 18,
    },
    dayName: {
        width: 100,
    },
    description: {
        width: 80,
        margin: 5,
    },
    temperature: {
        width: 55,
    },
    icon: {
        width: 50,
        height: 50,
    },
})