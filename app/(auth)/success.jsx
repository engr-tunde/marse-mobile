import ThemedText from "@/component/global/ThemedText";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import { router } from "expo-router";
import { Image, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Success() {
    const { currentTheme } = useTheme();
    const theme = Colors[currentTheme] ?? Colors.light;

    const glStyles = globalStyles();
    return (
        <SafeAreaView style={[glStyles.container, { backgroundColor: theme.uiBackground }]}>
            <StatusBar
                backgroundColor={currentTheme === "dark" ? "#000" : "#fff"}
                barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
            />
            <View style={[glStyles.containerInner]}>

                <View style={{ marginTop: 200, justifyContent: "center", alignItems: "center", gap: 20 }}>
                    <Image source={require("../../assets/images/illustrations-black.png")}
                        style={{ width: 300, resizeMode: "contain" }} />
                </View>
                <View style={{ justifyContent: "center", alignItems: "center", gap: 10 }}>
                    <ThemedText style={{ fontSize: 24, fontWeight: 600 }}>Success</ThemedText>
                    <View style={{ justifyContent: "center", alignItems: "center", }}>
                        <ThemedText>Your account has been set successfully.You can now</ThemedText>
                        <ThemedText>login to enjoy seamless shopping experience</ThemedText>
                    </View>
                </View>
                <View style={styles.loginButton}>
                    <Pressable onPress={() => router.replace("/forgetPassword")}>
                        <ThemedText>Login</ThemedText>
                    </Pressable>
                </View>
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