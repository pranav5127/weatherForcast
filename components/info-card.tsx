import {View, StyleSheet, Text} from "react-native";
import {Inter_100Thin, Inter_200ExtraLight} from "@expo-google-fonts/inter";
import {useFonts} from "expo-font";

function InfoCard() {
    const [fontsLoaded] = useFonts({
        Inter_100Thin,
        Inter_200ExtraLight,
    });

    if (!fontsLoaded) {
        return null
    }
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Wind Speed</Text>
            <View style={styles.textContainer}>
            <Text style={styles.text}>24</Text>
            <Text style={styles.titleText}>km/h</Text>
            </View>
        </View>
    )
}

export default InfoCard


const styles = StyleSheet.create({
    container: {
        height: 100,
        width: 100,
        backgroundColor: "#140841",
        padding: 8,
        marginHorizontal: 4,
        marginBottom: 48,
        borderRadius: 10,
        elevation: 8,
        alignItems: "center"
    },
    titleText: {
        color: "#fff",
        fontFamily: "Inter_200ExtraLight",
        fontSize: 12,
    },
    text: {
        color: "#fff",
        fontSize: 30,
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})