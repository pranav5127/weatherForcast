import React, { JSX, useState } from "react"
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native"
import { ThemedView } from "@/components/themed-view"
import { useTheme } from "@react-navigation/native"
import { Divider } from "react-native-paper"
import { useAppContext } from "@/hooks/useAppContext"
import { useRouter } from "expo-router"

export default function Settings(): JSX.Element {
    const { colors } = useTheme()
    const { temperatureUnit, setTemperatureUnit } = useAppContext()
    const [isFahrenheit, setIsFahrenheit] = useState(temperatureUnit === "F")
    const router = useRouter()

    const toggleTemperatureUnit = () => {
        const newUnit = isFahrenheit ? "C" : "F"
        setIsFahrenheit(!isFahrenheit)
        setTemperatureUnit(newUnit)
    }

    return (
        <ThemedView style={[styles.container, { backgroundColor: colors.background }]}>
            <Text style={[styles.heading, { color: colors.text }]}>Settings</Text>

            <View style={styles.section}>
                <View style={styles.row}>
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
            </View>

            <Divider style={{ marginVertical: 16, backgroundColor: colors.border }} />

            <TouchableOpacity
                style={[styles.button, { backgroundColor: colors.primary }]}
                onPress={() => router.push("/screens/search")}
            >
                <Text style={styles.buttonText}>Change Location</Text>
            </TouchableOpacity>
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
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    label: {
        fontSize: 18,
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
    button: {
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "600",
    },
})
