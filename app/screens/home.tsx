import {StyleSheet, ImageBackground, View, Text, ScrollView} from "react-native"
import React, {JSX, useEffect, useState} from "react"
import {ThemedView} from "@/components/themed-view"
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
    northern_lights
} from "@/assets/weather"
import TopBar from "@/components/top-bar"
import InfoCard from "@/components/info-card"
import {Inter_100Thin, Inter_200ExtraLight} from "@expo-google-fonts/inter"
import {useFonts} from "expo-font"
import {Router, useRouter} from "expo-router"
import {useLocation} from "@/hooks/useLocation";
import {WeatherApiResponse} from "@/services/models/weather-data";
import {getWeatherReport} from "@/services/getWeatherReport";

function Weather(): JSX.Element | null {
    const [fontsLoaded] = useFonts({
        Inter_100Thin,
        Inter_200ExtraLight
    })
    const router: Router = useRouter()
    const {selectedLocation} = useLocation()
    const [weatherData, setWeatherData] = useState<WeatherApiResponse | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        if (!selectedLocation) {
            setWeatherData(null)
            return
        }

        const fetchWeatherData = async () => {
            try {
                setLoading(true)
                const data = await getWeatherReport(selectedLocation.name)
                setWeatherData(data)
            } catch (err) {
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        fetchWeatherData()
    }, [selectedLocation])

    if (!fontsLoaded) {
        return null
    }
    return (
        <ThemedView style={styles.container}>
            <ImageBackground source={stars} style={styles.background} resizeMode="cover">
                <View style={styles.overlay}>
                    <TopBar
                        onMenuPress={() => {
                        }} // TODO
                        onLocationPress={() => router.push("/screens/search")}
                        location={selectedLocation?.name}
                    />

                    <View style={styles.tempContainer}>
                        <Text style={styles.temperatureText}>{weatherData?.current.temp_c} °C</Text>
                        <Text style={styles.text}>Feels like {weatherData?.current.feelslike_c} °C</Text>
                    </View>

                    <ScrollView
                        horizontal={true}
                        style={styles.infoCards}
                        contentContainerStyle={{paddingHorizontal: 20}}
                        showsHorizontalScrollIndicator={false}
                    >
                        <InfoCard/>
                        <InfoCard/>
                        <InfoCard/>
                        <InfoCard/>
                    </ScrollView>
                </View>
            </ImageBackground>
        </ThemedView>
    )
}

export default Weather

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
    text: {
        color: "#fff",
        fontSize: 16,
        paddingHorizontal: 8,
        fontFamily: "Inter_200ExtraLight",
    },
    infoCards: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        paddingVertical: 20,

    }
})
