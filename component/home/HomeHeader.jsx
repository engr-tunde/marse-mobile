import { merSeLogoDark, merSeLogoLight } from "@/assets/images";
import { Colors } from "@/constants/Colors";
import { useTheme } from "@/contexts/ThemeContext";
// import { useTheme } from "@/hooks/useTheme";
import { globalStyles } from "@/styles/global";
import {
  FontAwesome,
  MaterialIcons,
  SimpleLineIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";

const HomeHeader = () => {
  const { currentTheme, toggleTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;

  const glStyles = globalStyles();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingTop: currentTheme === "light" ? 0 : -20,
        paddingBottom: currentTheme === "light" ? 15 : 5,
      }}
    >
      <Image
        source={currentTheme === "dark" ? merSeLogoDark : merSeLogoLight}
        style={{ resizeMode: "contain", width: 80 }}
      />
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <Pressable
          onPress={() =>
            toggleTheme(currentTheme === "light" ? "dark" : "light")
          }
        >
          <View style={glStyles.iconContainer}>
            <FontAwesome
              name="moon-o"
              style={{ color: theme.title }}
              size={20}
            />
          </View>
        </Pressable>

        <Pressable onPress={() => router.push("/notification")}>
          <View style={glStyles.iconContainer}>
            <SimpleLineIcons
              name="bell"
              style={{ color: theme.title }}
              size={20}
            />
          </View>
        </Pressable>

        <Pressable onPress={() => router.push("(home)/wishlist-product")}>
          <View style={glStyles.iconContainer}>
            <MaterialIcons
              name="favorite-outline"
              style={{ color: theme.title }}
              size={20}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({});
