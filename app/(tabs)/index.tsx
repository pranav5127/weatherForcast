import { StyleSheet, ImageBackground, View, Text, ScrollView } from "react-native"
import React, { JSX, useEffect, useState } from "react"
import { ThemedView } from "@/components/themed-view"
import TopBar from "@/components/top-bar"
import InfoCard from "@/components/info-card"
import { Inter_100Thin, Inter_200ExtraLight } from "@expo-google-fonts/inter"
import { useFonts } from "expo-font"
import { useRouter, Router } from "expo-router"
import { useAppContext } from "@/hooks/useAppContext"
import { WeatherApiResponse } from "@/services/models/weather-data"
import { getWeatherReport } from "@/services/getWeatherReport"
import { ActivityIndicator } from "react-native-paper"
import { useTheme } from "@react-navigation/native"
import Ionicons from "@expo/vector-icons/Ionicons"
import Feather from "@expo/vector-icons/Feather"
import { AntDesign } from "@expo/vector-icons"
import { weatherBackgroundMap } from "@/constants/weatherBackgroundMap"
import { stars, sun, sunny } from "@/assets/weather"
import Forecast from "@/components/forecast"
import WeeklyForecast from "@/components/weeklyForecast"

function Weather(): JSX.Element | null {
    const [fontsLoaded] = useFonts({
        Inter_100Thin,
        Inter_200ExtraLight,
    })
    const router: Router = useRouter()
    const { colors } = useTheme()
    const { selectedLocation, temperatureUnit } = useAppContext()
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

    if (!fontsLoaded) return null

    const getBackgroundImage = () => {
        if (!weatherData) return sunny

        const code = weatherData.current.condition.code
        const isDay = weatherData.current.is_day === 1
        const mappedImage = weatherBackgroundMap[code]

        if (mappedImage) {
            if (!isDay && (code === 1000 || code === 1003)) return stars
            return mappedImage
        }

        return isDay ? sun : stars
    }

    const backgroundImage = getBackgroundImage()

    const formatTemperature = (c: number, f: number) =>
        temperatureUnit === "C" ? `${c.toFixed(1)} °C` : `${f.toFixed(1)} °F`
    return (
        <ThemedView style={styles.container}>
            <ImageBackground source={backgroundImage} style={styles.background} resizeMode="cover">
                <View style={styles.overlay}>
                    <TopBar
                        onMenuPress={() => router.push("/(tabs)/settings")}
                        onLocationPress={() => router.push("/(tabs)/search")}
                        location={selectedLocation?.name}
                    />

                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator animating size="large" color={colors.primary} />
                            <Text style={[styles.loadingText, { color: colors.text }]}>Loading...</Text>
                        </View>
                    ) : weatherData ? (
                        <>
                            <View style={styles.tempContainer}>
                                <Text style={styles.temperatureText}>
                                    {formatTemperature(weatherData.current.temp_c, weatherData.current.temp_f)}
                                </Text>
                                <Text style={styles.text}>
                                    {`Feels like ${formatTemperature(
                                        weatherData.current.feelslike_c,
                                        weatherData.current.feelslike_f
                                    )}`}
                                </Text>

                                <Text style={styles.text}>{weatherData.current.condition.text}</Text>

                                <Forecast hourlyData={weatherData.forecast.forecastday[0].hour} />
                                <WeeklyForecast weeklyData={weatherData.forecast} />


                            </View>

                            <ScrollView
                                horizontal
                                style={styles.infoCards}
                                contentContainerStyle={{ paddingHorizontal: 20 }}
                                showsHorizontalScrollIndicator={false}
                            >
                                <InfoCard
                                    title="Humidity"
                                    value={weatherData.current.humidity}
                                    unit="%"
                                    icon={<Ionicons name="water" size={64} color="#45DDFAFF" />}
                                />
                                <InfoCard
                                    title="Wind Speed"
                                    value={
                                        temperatureUnit === "C"
                                            ? weatherData.current.wind_kph
                                            : weatherData.current.wind_mph
                                    }
                                    unit={
                                        temperatureUnit === "C"
                                            ? ` kph Dir: ${weatherData.current.wind_dir}`
                                            : ` mph Dir: ${weatherData.current.wind_dir}`
                                    }
                                    icon={<Feather name="wind" size={64} color="#ffffff" />}
                                />
                                <InfoCard
                                    title="UV Index"
                                    value={weatherData.current.uv}
                                    icon={<AntDesign name="sun" size={64} color="#f7d511" />}
                                />
                                <InfoCard
                                    title="Pressure"
                                    value={weatherData.current.pressure_mb}
                                    unit=" mb"
                                    icon={<Ionicons name="speedometer-sharp" size={64} color="#ffffff" />}
                                />
                            </ScrollView>
                        </>
                    ) : (
                        <View style={styles.loadingContainer}>
                            <Text style={[styles.loadingText, { color: colors.text }]}>
                                Select a location to see weather.
                            </Text>
                        </View>
                    )}
                </View>
            </ImageBackground>
        </ThemedView>
    )
}

export default Weather

const styles = StyleSheet.create({
    container: { flex: 1 },
    background: { flex: 1, width: "100%", height: "100%" },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.3)",
    },
    tempContainer: {
        position: "absolute",
        top: 100,
    },
    temperatureText: {
        color: "#fff",
        fontSize: 80,
        marginHorizontal: 20,
        fontFamily: "Inter_200ExtraLight",
    },
    text: {
        color: "#fff",
        fontSize: 16,
        marginHorizontal: 20,
        paddingHorizontal: 8,
        fontFamily: "Inter_200ExtraLight",
    },
    infoCards: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        paddingVertical: 20,
    },
    loadingContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    loadingText: {
        marginTop: 8,
        fontSize: 16,
    },
})
