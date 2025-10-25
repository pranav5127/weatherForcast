import {View, StyleSheet, Text} from "react-native"
import {Inter_100Thin, Inter_200ExtraLight} from "@expo-google-fonts/inter"
import {useFonts} from "expo-font"
import {JSX} from "react"


interface Info {
    title: string
    value: number
    unit: string
    icon: JSX.Element
}

function InfoCard(
    {
        title,
        value,
        unit,
        icon
    }: Info
): JSX.Element | null {

    const [fontsLoaded] = useFonts({
        Inter_100Thin,
        Inter_200ExtraLight,
    });

    if (!fontsLoaded) {
        return null
    }
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{title}</Text>
            {icon}
            <View style={styles.textContainer}>
                <Text style={styles.text}>{value}{unit}</Text>
            </View>
        </View>
    )
}

export default InfoCard


const styles = StyleSheet.create({
    container: {
        height: 150,
        width: 150,
        backgroundColor: "rgb(13,4,44)",
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
        fontSize: 16,
    },
    text: {
        color: "#fff",
        fontSize: 25,
    },
    textContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
})