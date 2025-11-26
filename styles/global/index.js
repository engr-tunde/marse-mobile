import { Colors } from "@/constants/Colors";
import { useTheme } from "@/hooks/useTheme";
import { StatusBar, StyleSheet } from "react-native";

export const globalStyles = () => {
  const { currentTheme } = useTheme();
  const theme = Colors[currentTheme] ?? Colors.light;

  const st = StyleSheet.create({
    iconContainer: {
      height: 33,
      width: 33,
      borderWidth: 1,
      borderColor: theme.title,
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      flex: 1,
      paddingTop: StatusBar.currentHeight,
      paddingHorizontal: 5,
    },
    containerInner: {
      paddingHorizontal: 15,
    },
  });

  return st;
};
