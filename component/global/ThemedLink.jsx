import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { Link } from "expo-router";
import React from "react";
import { StyleSheet, Text } from "react-native";

const ThemedLink = ({ type, style, replace = false, link, ...props }) => {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.dark;
  const textColor = type === "title" ? theme.title : theme.text;

  const fontFamily =
    style?.fontWeight === 500
      ? "Urbanist_500Medium"
      : style?.fontWeight === 600
      ? "Urbanist_600SemiBold"
      : style?.fontWeight === 700
      ? "Urbanist_700Bold"
      : style?.fontWeight === 800
      ? "Urbanist_800ExtraBold"
      : style?.fontWeight === 900
      ? "Urbanist_900Black"
      : style?.fontWeight === "bold"
      ? "Urbanist_700Bold"
      : "Urbanist_400Regular";

  return (
    <Link replace={replace} href={link}>
      <Text
        style={[{ color: textColor, fontFamily: fontFamily }, style]}
        {...props}
      />
    </Link>
  );
};

export default ThemedLink;

const styles = StyleSheet.create({});