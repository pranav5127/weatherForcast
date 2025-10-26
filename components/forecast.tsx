import React, { JSX } from "react"
import { FlatList, View, Text, StyleSheet, Image } from "react-native"
import { HourlyForecast } from "@/services/models/weather-data"

interface ForecastProps {
    hourlyData: HourlyForecast[]
}

export default function Forecast({ hourlyData }: ForecastProps): JSX.Element {
    const currentEpoch = Math.floor(Date.now() / 1000)

    const upcomingHours = hourlyData.filter(item => item.time_epoch >= currentEpoch)

    return (
        <View style={styles.container}>
            <FlatList
                data={upcomingHours}
                keyExtractor={(item) => item.time_epoch.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.time}>{item.time.split(" ")[1]}</Text>
                        <Image source={{ uri: "https:" + item.condition.icon }} style={styles.icon} />
                        <Text style={styles.temp}>{item.temp_c.toFixed(1)}°C</Text>
                        <Text style={styles.condition}>{item.condition.text.trim()}</Text>
                        <Text style={styles.meta}>
                            💧 {item.humidity}% | 🌬 {item.wind_kph} kph
                        </Text>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 2,
        marginVertical: 16
    },
    listContent: {
        paddingHorizontal: 4,
    },
    card: {
        backgroundColor: "rgba(13,4,44,0.3)",
        borderRadius: 14,
        paddingVertical: 12,
        paddingHorizontal: 8,
        marginHorizontal: 6,
        alignItems: "center",
        justifyContent: "center",
        width: 110,
    },
    time: {
        color: "#FFF",
        fontSize: 14,
        marginBottom: 4,
    },
    icon: {
        width: 42,
        height: 42,
        marginVertical: 4,
    },
    temp: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
    condition: {
        color: "#CCC",
        fontSize: 12,
        textAlign: "center",
    },
    meta: {
        color: "#AAA",
        fontSize: 10,
        marginTop: 4,
    },
})
