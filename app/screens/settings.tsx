import React, {JSX, useState} from "react"
import { View, Text, StyleSheet, Switch } from "react-native"
import { ThemedView } from "@/components/themed-view"
import { useTheme } from "@react-navigation/native"
import {Divider } from "react-native-paper"
import {useAppContext} from "@/hooks/useAppContext";

export default function Settings(): JSX.Element {
    const { colors } = useTheme()
    const {temperatureUnit, setTemperatureUnit} = useAppContext()
    const [isFahrenheit, setIsFahrenheit] = useState(temperatureUnit === "F")

    const toggleTemperatureUnit = () => {
        const newUnit = isFahrenheit ? "C" : "F"
        setIsFahrenheit(!isFahrenheit)
        setTemperatureUnit(newUnit)
        console.log([temperatureUnit, isFahrenheit])
    }


    return (
        <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.heading, { color: colors.text }]}>Settings</Text>

            <View style={styles.section}>
                <Text style={[styles.label, { color: colors.text }]}>Temperature Unit</Text>
                <View style={styles.switchContainer}>
                    <Text style={[styles.unitLabel, { color: colors.text }]}>°C</Text>
                    <Switch
                        value={isFahrenheit}
                        onValueChange={toggleTemperatureUnit}
                        trackColor={{ false: "#ccc", true: "#81b0ff" }}
                        thumbColor={isFahrenheit ? "#007AFF" : "#f4f3f4"}
                    />
                    <Text style={[styles.unitLabel, { color: colors.text }]}>°F</Text>
                </View>
            </View>

            <Divider style={{ marginVertical: 16, backgroundColor: colors.border }} />


        </ThemedView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    heading: {
        fontSize: 28,
        fontWeight: "700",
        marginBottom: 24,
    },
    section: {
        marginBottom: 20,
    },
    label: {
        fontSize: 18,
        marginBottom: 8,
        fontWeight: "600",
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    unitLabel: {
        fontSize: 16,
        fontWeight: "500",
    },
    locationItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        marginVertical: 6,
    },
    locationText: {
        fontSize: 16,
    },
    emptyText: {
        textAlign: "center",
        marginTop: 12,
        fontSize: 16,
        opacity: 0.6,
    },
})
