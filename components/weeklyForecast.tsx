import React, { JSX } from "react"
import { View, Text, FlatList, StyleSheet, Image } from "react-native"
import type { ForecastData } from "@/services/models/weather-data"
import { useAppContext } from "@/hooks/useAppContext"

interface WeeklyForecastProps {
    weeklyData?: ForecastData
}

export default function WeeklyForecast({ weeklyData }: WeeklyForecastProps): JSX.Element {
    const { temperatureUnit } = useAppContext()
    const days = weeklyData?.forecastday ?? []

    if (days.length === 0) {
        return <Text style={styles.empty}>No weekly data</Text>
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={days.slice(0, 14)}
                keyExtractor={(item) => item.date_epoch.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
                renderItem={({ item, index }) => {
                    const minTemp =
                        temperatureUnit === "C"
                            ? Math.round(item.day.mintemp_c)
                            : Math.round(item.day.mintemp_f)
                    const maxTemp =
                        temperatureUnit === "C"
                            ? Math.round(item.day.maxtemp_c)
                            : Math.round(item.day.maxtemp_f)
                    const unit = temperatureUnit === "C" ? "°C" : "°F"

                    return (
                        <View
                            style={[
                                styles.item,
                                index === 0 && styles.firstItem,
                                index === days.slice(0, 14).length - 1 && styles.lastItem,
                            ]}
                        >
                            <Text style={styles.date}>{item.date}</Text>
                            <Image
                                source={{
                                    uri: item.day.condition.icon.startsWith("http")
                                        ? item.day.condition.icon
                                        : "https:" + item.day.condition.icon,
                                }}
                                style={styles.icon}
                            />
                            <Text style={styles.temp}>
                                {minTemp}° / {maxTemp}{unit}
                            </Text>
                        </View>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 0,
        paddingVertical: 10,
    },
    listContent: {
        paddingHorizontal: 16,
    },
    item: {
        alignItems: "center",
        justifyContent: "center",
        width: 100,
        height: 130,
        borderRightWidth: 0.5,
        borderColor: "rgba(255,255,255,0.2)",
        backgroundColor: "rgba(13,4,44,0.3)",
    },
    firstItem: {
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
    },
    lastItem: {
        borderTopRightRadius: 16,
        borderBottomRightRadius: 16,
    },
    date: {
        color: "#FFF",
        fontSize: 12,
        marginBottom: 4,
    },
    icon: {
        width: 36,
        height: 36,
        marginBottom: 6,
    },
    temp: {
        color: "#FFF",
        fontSize: 14,
        fontWeight: "500",
    },
    empty: {
        color: "#999",
        textAlign: "center",
        marginTop: 10,
    },
})
