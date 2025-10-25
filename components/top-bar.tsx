import {Pressable, StyleSheet, Text, View} from "react-native"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import {JSX} from "react"

interface TopBarProps {
    onMenuPress: () => void
    onLocationPress: () => void
    location?: string
}

function TopBar(
    {
        onMenuPress,
        onLocationPress,
        location = "Tap here to search"
    }: TopBarProps
): JSX.Element {

    return (
        <View style={styles.container}>
            <Pressable style={styles.locationButton} onPress={onLocationPress}>
                <MaterialIcons name="location-on" size={24} color="#fff"/>
                <Text style={styles.locationText}>{location}</Text>
            </Pressable>

            <Pressable style={styles.menuButton} onPress={onMenuPress}>
                <MaterialIcons name="menu" size={28} color="#fff"/>
            </Pressable>
        </View>
    )
}

export default TopBar

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        top: 40,
        left: 10,
        right: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
    locationButton: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
    },
    locationText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
    menuButton: {
        padding: 4,
    },
})
