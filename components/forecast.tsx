import React, { JSX } from "react"
import { FlatList, View, Text, StyleSheet, Image } from "react-native"
import {HourlyForecast} from "@/services/models/weather-data"

interface ForecastProps {
    hourlyData: HourlyForecast[]
}

export default function Forecast({ hourlyData }: ForecastProps): JSX.Element {
    return (
            <FlatList
                data={hourlyData}
                keyExtractor={(item) => item.time_epoch.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.time}>{item.time.split(" ")[1]}</Text>
                        <Image source={{ uri: "https:" + item.condition.icon }} style={styles.icon} />
                        <Text style={styles.temp}>{item.temp_c.toFixed(1)}°C</Text>
                        <Text style={styles.condition}>{item.condition.text.trim()}</Text>
                        <Text style={styles.meta}>💧 {item.humidity}% | 🌬 {item.wind_kph} kph</Text>
                    </View>
                )}
            />
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#0d042c",
        borderRadius: 12,
        padding: 8,
        marginHorizontal: 6,
        marginTop: 16,
        alignItems: "center",
        width: 120,

    },
    time: {
        color: "#FFF",
        fontSize: 14,
        marginBottom: 4,
    },
    icon: {
        width: 40,
        height: 40,
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
