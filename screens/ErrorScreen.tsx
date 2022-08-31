import { View, Image, StyleSheet, ImageSourcePropType, Text, TouchableOpacity, AppState, Linking } from 'react-native'
import { ImageAssets } from "../assets/ImageAssets"
import { ErrorScreenScreenRouteProp } from "../navigation/types"
import { errorMessages, locationPermissions } from "../consts/en"
import Spacer from "../components/Spacer"
import { Feather } from '@expo/vector-icons';
import { PermissionStatus } from "../types/enums";
import * as Location from 'expo-location';
import { useCallback, useEffect, useRef, useState } from "react"
import { isIOS } from "../utils/platform"
import { Modal } from "../components/Modal"
import SettingsButton from "../components/SettingsButton"

export default function ErrorScreen({ navigation }: ErrorScreenScreenRouteProp) {

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const subscription = AppState.addEventListener("change", async (nextAppState) => {
            if (["inactive", "background"].indexOf(appState.current) > -1 && nextAppState === "active") {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status === PermissionStatus.GRANTED) {
                    setIsModalVisible(false);
                }
            }
            appState.current = nextAppState;
        });

        return () => {
            subscription?.remove();
        };
    }, []);

    const goBack = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === PermissionStatus.GRANTED) {
            navigation.goBack();
            return;
        }
        setIsModalVisible(true);
    }

    const onModalClose = useCallback(() => {
        setIsModalVisible(false);
    }, []);

    const onOpenSettings = async () => {
        if (isIOS) {
            Linking.openURL("app-settings:");
        } else {
            Linking.openSettings();
        }
    };


    return (
        <View style={styles.mainContainer}>
            <Modal
                visible={isModalVisible}
                title={locationPermissions.location_permissions}
                subtitle={locationPermissions.we_need_to_access_your_location}
                onRequestClose={onModalClose}
            >
                <SettingsButton onPress={onOpenSettings} />
            </Modal>
            <TouchableOpacity onPress={goBack} style={styles.pageCloseContainer}>
                <Feather name="x" size={40} color="#404142" />
            </TouchableOpacity>
            <View style={styles.container}>
                <Image source={ImageAssets.errorStormImage as ImageSourcePropType} style={styles.image} />
                <Spacer spacingValue={4} />
                <View style={styles.messageContainer}>
                    <Text style={[styles.textAligment, styles.title]}>{errorMessages.oh_no}</Text>
                    <Text style={[styles.textAligment, styles.subtitle]}>{errorMessages.we_tried_to_ask}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    pageCloseContainer: {
        position: "absolute",
        marginTop: 40,
        right: 20,
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 200,
    },
    messageContainer: {
        justifyContent: "center",
        alignItems: "center",
    },
    textAligment: {
        textAlign: "center",
        paddingHorizontal: 30,
        color: "#404142",
    },
    title: {
        fontWeight: "bold",
        fontSize: 32,
        lineHeight: 40,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 16,
        lineHeight: 22,
    },
})