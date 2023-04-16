import { View, Text, StyleSheet } from 'react-native'
import globalStore from "../store/GlobalSettings";
import TextTicker from 'react-native-text-ticker';
import { detailedContent } from "../consts/en";
import getRecalculatedValue from "../utils/getRecalculatedValue";
import { useTheme } from "../hooks/ThemeProvider";
import { themeMode } from "../utils/themeMode";

export default function BoxDetailedList({ item }: any) {
    const unit = getRecalculatedValue(item.main.feels_like);
    const { theme } = useTheme();
    const styles = useStyles(themeMode[theme].color);

    return (

        <View style={styles.dataListStyles}>
            <View style={styles.row}>
                <View style={styles.inRowBox}>
                    <TextTicker
                        style={[styles.valueTitle, themeMode[theme]]}
                        duration={4000}
                        loop
                        scroll
                        repeatSpacer={100}
                        marqueeDelay={1200}
                    >
                        {detailedContent.per_temp}
                    </TextTicker>
                    <Text style={[styles.textAligement, styles.value]}>
                        {unit} {globalStore.unit}
                    </Text>
                </View>
                <View style={styles.inRowBox}>
                    <Text style={[styles.textAligement, styles.valueTitle]}>Humidity</Text>
                    <Text style={[styles.textAligement, styles.value]}>{item.main.humidity} %</Text>
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.inRowBox}>
                    <Text style={[styles.textAligement, styles.valueTitle]}>{detailedContent.wind}</Text>
                    <Text style={[styles.textAligement, styles.value]}>{item.wind.speed} km/h</Text>
                </View>
                <View style={styles.inRowBox}>
                    <TextTicker
                        style={[styles.textAligement, styles.valueTitle]}
                        duration={4000}
                        loop
                        bounce
                        scroll
                        repeatSpacer={100}
                        marqueeDelay={1200}
                    >
                        {detailedContent.probability}
                    </TextTicker>
                    <Text style={[styles.textAligement, styles.value]}>{item.pop === 0 ? 0 : 100} %</Text>
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.inRowBox}>
                    <Text style={[styles.textAligement, styles.valueTitle]}>{detailedContent.pressure}</Text>
                    <Text style={[styles.textAligement, styles.value]}>{item.main.pressure} hPa</Text>
                </View>
                <View style={styles.inRowBox}>
                    <Text style={[styles.textAligement, styles.valueTitle]}>{detailedContent.cloudiness}</Text>
                    <Text style={[styles.textAligement, styles.value]}>{item.clouds.all} %</Text>
                </View>
            </View>
        </View>
    )
}

const useStyles = (color: string) => StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    textAligement: {
        textAlign: "center",
        color: color,
    },
    value: {
        fontSize: 25,
        fontWeight: "bold",
    },
    valueTitle: {
        fontSize: 18,
    },
    inRowBox: {
        width: 160,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
    dataListStyles: {
        flex: 1,
    },
})