import ThemedText from "@/component/global/ThemedText";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import { StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";

export default function Review() {
    const { currentTheme } = useTheme();
    const theme = Colors[currentTheme] ?? Colors.light;
    const glStyles = globalStyles();
    return (
        <SafeAreaView
            style={[glStyles.container, { backgroundColor: theme.uiBackground }]}

        >
            <StatusBar
                backgroundColor={currentTheme === "dark" ? "#000" : "#fff"}
                barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
            />
            <View style={[glStyles.containerInner, styles.container]}>
            <View style={styles.header}>
          <AntDesign
            name="arrow-left"
            size={24}
            color={theme.title}
            onPress={() => router.back()}
          />
          <ThemedText style={styles.headerText}>Review</ThemedText>
     <View></View>
        </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        gap: 20,
      },
      header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      },
      headerText: {
        fontSize: 18,
        fontWeight: "bold",
      },
})
