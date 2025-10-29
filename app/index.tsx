import { View, Text, StyleSheet } from "react-native";

export default function Index() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello World — Root Route Works ✅</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
    },
    text: {
        fontSize: 18,
        fontWeight: "600",
    },
});
