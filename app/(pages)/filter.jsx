import FilterInput from "@/component/global/Filter";
import ThemedText from "@/component/global/ThemedText";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import AntDesign from "@expo/vector-icons/AntDesign";
import { router } from "expo-router";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Filter() {
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
        <AntDesign
          name="arrow-left"
          size={24}
          color="#fff"
          style={{ marginBottom: 10 }}
        />
        <FilterInput />
        <ThemedText style={{ color: "#ddd" }}>
          "Showing result for{" "}
          <ThemedText
            style={{ color: "#fff" }}
            onPress={() => router.push("/dinner")}
          >
            Dinner gown"
          </ThemedText>
        </ThemedText>
      </View>
    </SafeAreaView>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#000",
//     paddingTop: StatusBar.currentHeight,
//     gap: 28,
//   },
// });
