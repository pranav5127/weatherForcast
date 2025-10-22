import { StyleSheet, ImageBackground, View, Text } from "react-native"
import { JSX } from "react"
import { ThemedView } from "@/components/themed-view"
import {
    cloudy,
    fog,
    heat,
    overcast,
    rainy,
    snow,
    stars,
    sun,
    sunny,
    thunder,
} from "@/assets/weather"
import SearchBar from "@/components/search-bar"

export default function Weather(): JSX.Element {
    return (
        <ThemedView style={styles.container}>
            <ImageBackground source={thunder} style={styles.background} resizeMode="cover">
                <View style={styles.overlay}>
                    <SearchBar />

                    <View style={styles.tempContainer}>
                        <Text style={styles.temperatureText}>23{"\u00B0"}C</Text>
                    </View>
                </View>
            </ImageBackground>
        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.2)",
    },
    tempContainer: {
        position: "absolute",
        left: 20,
        top: 100,
    },
    temperatureText: {
        color: "#fff",
        fontSize: 80,
        fontFamily: "Inter_200ExtraLight",
    },
})
