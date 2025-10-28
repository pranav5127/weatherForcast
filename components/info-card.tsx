import React, {JSX} from "react"
import { View, StyleSheet, Text } from "react-native"
import { useFonts, Inter_200ExtraLight, Inter_300Light } from "@expo-google-fonts/inter"

interface Info {
    title: string
    value: number | string
    unit?: string
    icon: React.ReactElement
}

export default function InfoCard({ title, value, unit = "", icon }: Info): JSX.Element | null {
    const [fontsLoaded] = useFonts({
        Inter_200ExtraLight,
        Inter_300Light,
    })

    if (!fontsLoaded) return null

    return (
        <View style={styles.card}>
            <Text style={styles.title}>{title}</Text>
            <View style={styles.iconContainer}>{icon}</View>
            <Text style={styles.value}>
                {value}
                <Text style={styles.unit}>{unit}</Text>
            </Text>
        </View>
    )
}

const sharedCard = {
    backgroundColor: "rgba(13,4,44,0.3)",
    borderRadius: 14,
    paddingVertical: 16,
    paddingHorizontal: 10,
    marginHorizontal: 6,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    width: 140,
    height: 160,
}

const styles = StyleSheet.create({
    card: {
        ...sharedCard,
        marginBottom: 36
    },
    title: {
        color: "#CCC",
        fontFamily: "Inter_200ExtraLight",
        fontSize: 14,
        marginBottom: 8,
        textAlign: "center" as const,
    },
    iconContainer: {
        marginBottom: 8,
    },
    value: {
        color: "#FFF",
        fontFamily: "Inter_300Light",
        fontSize: 22,
    },
    unit: {
        color: "#AAA",
        fontSize: 14,
    },
})
