import React, { JSX } from "react"
import { FlatList, View, Text, StyleSheet, Image } from "react-native"
import type { HourlyForecast } from "@/services/models/weather-data"
import { useAppContext } from "@/hooks/useAppContext"

interface ForecastProps {
    hourlyData?: HourlyForecast[]
}

export default function Forecast({ hourlyData }: ForecastProps): JSX.Element {
    const { temperatureUnit } = useAppContext()

    if (!hourlyData || hourlyData.length === 0) {
        return <Text style={styles.empty}>No hourly data</Text>
    }

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
                renderItem={({ item, index }) => {
                    const temperature =
                        temperatureUnit === "C" ? item.temp_c.toFixed(1) : item.temp_f.toFixed(1)
                    const unitSymbol = temperatureUnit === "C" ? "°C" : "°F"

                    return (
                        <View
                            style={[
                                styles.item,
                                index === 0 && styles.firstItem,
                                index === upcomingHours.length - 1 && styles.lastItem,
                            ]}
                        >
                            <Text style={styles.time}>{item.time.split(" ")[1]}</Text>
                            <Image
                                source={{
                                    uri: item.condition.icon.startsWith("http")
                                        ? item.condition.icon
                                        : "https:" + item.condition.icon,
                                }}
                                style={styles.icon}
                            />
                            <Text style={styles.temp}>{`${temperature}${unitSymbol}`}</Text>
                        </View>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 0,
        paddingVertical: 10,
    },
    listContent: {
        paddingHorizontal: 16,
    },
    item: {
        alignItems: "center",
        justifyContent: "center",
        width: 90,
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
    time: {
        color: "#FFF",
        fontSize: 12,
        marginBottom: 6,
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
