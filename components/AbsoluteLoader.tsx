import { ActivityIndicator, StyleSheet, Text, Dimensions, View } from "react-native";

export default function Loader() {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={50} color="#999999" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        height: Dimensions.get('window').height - 150,
    },
})