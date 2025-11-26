import ThemedText from "@/component/global/ThemedText";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import {
  Pressable,
  StatusBar,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Themes() {
  const { currentTheme, toggleTheme, useSystemTheme, isSystemTheme } =
    useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;
  const glStyles = globalStyles();
  const router = useRouter();

  console.log("theme title", theme.title);

  return (
    <SafeAreaView
      style={[glStyles.container, { backgroundColor: theme.uiBackground }]}
    >
      <StatusBar
        backgroundColor={currentTheme === "dark" ? "#000" : "#fff"}
        barStyle={currentTheme === "dark" ? "light-content" : "dark-content"}
      />
      <View style={[glStyles.containerInner, { marginTop: 20 }]}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 8,
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <Pressable onPress={() => router.back()}>
            <AntDesign name="arrow-left" size={24} color={theme.title} />
          </Pressable>
          <ThemedText
            style={{
              fontSize: 18,
              fontWeight: 600,
            }}
          >
            Themes
          </ThemedText>
          <View></View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignContent: "center",
            justifyContent: "space-between",
          }}
        >
          <ThemedText style={{ fontWeight: "bold" }}>Dark mode</ThemedText>

          <Switch
            trackColor={{ false: "#fff", true: "#fff" }}
            thumbColor={currentTheme === "dark" ? "#000" : "#fff"}
            ios_backgroundColor={currentTheme === "dark" ? "#fff" : "#000"}
            value={currentTheme === "dark"}
            onValueChange={() =>
              toggleTheme(currentTheme === "light" ? "dark" : "light")
            }
            style={{
              padding: 5,
              transform: [{ scaleX: 0.8 }, { scaleY: 0.8 }],
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            useSystemTheme();
          }}
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginTop: 15,
          }}
        >
          <View style={styles.titleWrapper}>
            <MaterialCommunityIcons
              name="theme-light-dark"
              size={25}
              color={theme.text}
            />
            <ThemedText
              type="title"
              style={[{ fontSize: 14, fontWeight: "bold" }]}
            >
              Use system theme
            </ThemedText>
          </View>
          <MaterialCommunityIcons
            name={
              isSystemTheme ? "check-circle" : "checkbox-blank-circle-outline"
            }
            size={25}
            color={isSystemTheme ? theme.iconColorFocused : theme.iconColor}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
});
