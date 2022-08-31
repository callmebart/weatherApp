import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { settings } from "../consts/en";
import { MaterialIcons } from '@expo/vector-icons';
import { CELSIUS_UNIT, FAHRENHEIT_UNIT } from "../consts/symbols";

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming,
} from 'react-native-reanimated';
import { useEffect, useState } from "react";
import globalStore from "../store/GlobalSettings";
import { Observer } from "mobx-react-lite";

export default function SettingsScreen() {

    const [isEnabled, setIsEnabled] = useState(globalStore.defaultUnit === CELSIUS_UNIT);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(() => {
        globalStore.changeUnit(isEnabled ? CELSIUS_UNIT : FAHRENHEIT_UNIT)
    }, [isEnabled])


    const menuHeight = useSharedValue(70);
    const animatedStyles = useAnimatedStyle(() => {
        return {
            height: menuHeight.value
        }
    })

    const animatedIndex = useSharedValue(0)
    const animatedIndexStyle = useAnimatedStyle(() => {
        return {
            zIndex: animatedIndex.value,
            opacity: animatedIndex.value,
            transform: [{ scale: animatedIndex.value }],
            display: animatedIndex.value == 0 ? 'none' : 'flex'
        }
    })

    const rotateIcon = useSharedValue(0)
    const animatedIcon = useAnimatedStyle(() => {
        return {
            transform: [{ rotateZ: '' + rotateIcon.value + 'deg' }]
        }
    })
    const animateMenu = () => {
        rotateIcon.value === 180 && menuHeight.value === 295
            ? rotateIcon.value = withTiming(0, { duration: 400 })
            : rotateIcon.value = rotateIcon.value = withTiming(180, { duration: 400 })

        menuHeight.value === 295
            ? menuHeight.value = withTiming(70, { duration: 300 })
            : menuHeight.value = withTiming(295, { duration: 300 })

        animatedIndex.value === 0
            ? animatedIndex.value = withTiming(1, { duration: 300 })
            : animatedIndex.value = 0
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.settingContainer}>
                <Animated.View style={[styles.settingContainer, animatedStyles]}>
                    <View>
                        <View style={styles.headerContainerView}>
                            <Text numberOfLines={2} style={styles.description}>{settings.temperature_unit}</Text>
                            <Observer>
                                {() =>
                                    <Text numberOfLines={1} ellipsizeMode="tail" style={styles.buttonText}>
                                        {globalStore.unit === CELSIUS_UNIT ? settings.degrees_cel : settings.degrees_fahr} {CELSIUS_UNIT}
                                    </Text>
                                }
                            </Observer>

                            <TouchableOpacity style={styles.button}
                                onPress={() => { menuHeight.value === 295 || menuHeight.value === 70 ? animateMenu() : {} }}
                            >
                                <Animated.View style={[animatedIcon]}>
                                    <MaterialIcons name="keyboard-arrow-down" size={35} color="#404142" />
                                </Animated.View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Animated.View style={[animatedIndexStyle]}>
                        <View style={styles.centerInRow}>
                            <Text style={{ color: '#9f9f9f' }}>{settings.default_unit_celsius}</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "#81b0ff" }}
                                thumbColor={"#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={toggleSwitch}
                                value={isEnabled}
                            />
                        </View>

                    </Animated.View>

                </Animated.View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 30,
        alignItems: "center",
        backgroundColor: "white",
    },
    description: {
        fontSize: 18,
        width: 120,
        textAlign: "center",
        color: "#404142",
    },
    settingContainer: {
        zIndex: 20,
        justifyContent: 'space-between',
        opacity: 0.99,
        width: 300,
        borderRadius: 20,
        backgroundColor: "#fafafa"
    },
    button: {
        width: 50,
        height: 70,
        zIndex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: "#404142",
        fontSize: 16,
        width: 110,
        marginLeft: 20
    },
    headerContainerView: {
        width: 300,
        height: 70,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 20,
    },
    centerInRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
})