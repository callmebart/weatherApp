import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'


interface Props {
    onPress: () => void;
}

export default function SettingsButton({ onPress }: Props) {
    return (
        <View style={styles.modalButtonContainer}>
            <TouchableOpacity onPress={onPress} style={styles.settingsButton}>
                <Text style={styles.settingsButtonText}>Settings</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    modalButtonContainer: {
        width: 281,
    },
    settingsButton: {
        width: 100,
        marginRight: 50,
        alignSelf: "flex-end",
        backgroundColor: "rgba(142,177,212,0.3)",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
        borderRadius: 8,
    },
    settingsButtonText: {
        color: "#404142",
        fontWeight: "bold",
    },
})