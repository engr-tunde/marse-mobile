import { illustration } from "@/assets/images";
import ThemedText from "@/component/global/ThemedText";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import { router } from "expo-router";
import { Image, Pressable, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OrderFeedback() {
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
                <Image source={illustration}
                    style={{ width: 300, resizeMode: "contain" }}
                />
                <View>
                    <ThemedText>Order Cancelled</ThemedText>
                    <ThemedText>Your order #8739938 has been successfully cancelled.</ThemedText>
                    <ThemedText>Refund (If applicable) will be processed to your</ThemedText>
                    <ThemedText>Original payment method</ThemedText>
                </View>
                <View style={styles.loginButton}>
                    <Pressable onPress={() => router.push("/forgetPassword")}>
                        <ThemedText>Done</ThemedText>
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
        backgroundColor: "#000",
        gap: 28,
        paddingTop: StatusBar.currentHeight
    },
    loginButton: {
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 16,
        marginTop: 28,
    },
})