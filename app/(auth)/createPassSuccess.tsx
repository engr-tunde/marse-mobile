import { router } from "expo-router";
import { Image, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Success() {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#fff" barStyle="dark-content" />
            <View style={{ marginTop: 200, justifyContent: "center", alignItems: "center", gap: 20 }}>
                <Image source={require("../../assets/images/illustrations-black.png")}
                    style={{ width: 300, resizeMode: "contain" }} />
            </View>
            <View style={{ justifyContent: "center", alignItems: "center", gap: 10 }}>
                <Text style={{ color: "#000", fontSize: 24, fontWeight: "bold" }}>Success</Text>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                    <Text style={{ color: "#000" }}>Your password has been change successfully</Text>
                </View>
            </View>
            <View style={styles.loginButton}>
                <Pressable onPress={() => router.push("/failPassword")}>
                    <Text style={{ color: "#fff" }}>Login</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
        paddingTop: StatusBar.currentHeight,
        gap: 28,
    },
    loginButton: {
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        marginTop: 28,
    },
})